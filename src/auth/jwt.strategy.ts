import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "./jwt.constans";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) {
        return { userId: payload.id, email: payload.email}
    }
}
