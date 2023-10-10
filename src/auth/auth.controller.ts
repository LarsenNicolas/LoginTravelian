import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SessionAuthDto } from './dto/session-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  logInUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.logIn(loginAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSession(@Request() req) { 
    return req.user;
  }
}
