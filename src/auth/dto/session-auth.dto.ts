import { IsNotEmpty } from "class-validator";

export class SessionAuthDto {
    @IsNotEmpty()
    jwtToken: string;
}