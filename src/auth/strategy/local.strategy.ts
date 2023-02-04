import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AdminAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log("local validate")
    const token = await this.authService.login(username,password);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}