import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity";
import { AdminAuthService } from "./services/admin-auth.service";
import { AdminAuthStrategy } from "./strategy/admin.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: "AUTH_ADMIN_JWT_SECRET",
            signOptions: { expiresIn: "60s"}
        }), 
        TypeOrmModule.forFeature([User]),
        PassportModule],
    providers: [AdminAuthStrategy, AdminAuthService, LocalStrategy, AdminAuthStrategy],
    exports: [AdminAuthService, AdminAuthStrategy, LocalStrategy],
})
export class AuthModule {}