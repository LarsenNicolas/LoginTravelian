import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtAuthService: JwtService,
    private jwtStrategy: JwtStrategy
  ) {}

  async register(user: RegisterAuthDto) {
    const { password } = user;
    const hashedPassword = await hash(password, 5);
    
    user = { ...user, password: hashedPassword };
    
    return this.userService.create(user);
  }

  async logIn(user: LoginAuthDto) {
    const { email, password } = user;
    const findUser = await this.userService.findOne(email);

    if(!findUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    
    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);

    const payload = { id: findUser.id, email: email }
    const token = this.jwtAuthService.sign(payload);

    const data = {
      user: findUser,
      token: token
    };

    return data;
  }
}
