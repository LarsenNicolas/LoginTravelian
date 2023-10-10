import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
export declare class AuthService {
    private readonly userService;
    private jwtAuthService;
    private jwtStrategy;
    constructor(userService: UserService, jwtAuthService: JwtService, jwtStrategy: JwtStrategy);
    register(user: RegisterAuthDto): Promise<import("../user/dto/create-user.dto").CreateUserDto & import("../user/entities/user.entity").User>;
    logIn(user: LoginAuthDto): Promise<{
        user: import("../user/entities/user.entity").User;
        token: string;
    }>;
}
