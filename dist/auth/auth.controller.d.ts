import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(registerAuthDto: RegisterAuthDto): Promise<import("../user/dto/create-user.dto").CreateUserDto & import("../user/entities/user.entity").User>;
    logInUser(loginAuthDto: LoginAuthDto): Promise<{
        user: import("../user/entities/user.entity").User;
        token: string;
    }>;
    getSession(req: any): any;
}
