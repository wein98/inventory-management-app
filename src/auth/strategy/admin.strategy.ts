import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminAuthService } from "../services/admin-auth.service";

@Injectable()
export class AdminAuthStrategy extends PassportStrategy(Strategy, "admin") {
    constructor(private authService: AdminAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: "AUTH_ADMIN_JWT_SECRET"
        })
    }

    async validate(credential: any) {
        const attempt = this.authService.attempt(credential);
        if (!attempt) {
            throw new UnauthorizedException();
          }
        return attempt;
    }
}