"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthService = class AuthService {
    constructor(userService, jwtAuthService, jwtStrategy) {
        this.userService = userService;
        this.jwtAuthService = jwtAuthService;
        this.jwtStrategy = jwtStrategy;
    }
    async register(user) {
        const { password } = user;
        const hashedPassword = await (0, bcrypt_1.hash)(password, 5);
        user = { ...user, password: hashedPassword };
        return this.userService.create(user);
    }
    async logIn(user) {
        const { email, password } = user;
        const findUser = await this.userService.findOne(email);
        if (!findUser)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        const checkPassword = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!checkPassword)
            throw new common_1.HttpException('Wrong password', common_1.HttpStatus.FORBIDDEN);
        const payload = { id: findUser.id, email: email };
        const token = this.jwtAuthService.sign(payload);
        const data = {
            user: findUser,
            token: token
        };
        return data;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        jwt_strategy_1.JwtStrategy])
], AuthService);
//# sourceMappingURL=auth.service.js.map