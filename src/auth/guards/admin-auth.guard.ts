import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AdminAuthGuard extends AuthGuard("admin") {
    constructor() {
        super();
    }

    // async canActivate(context: ExecutionContext): Promise<any> {
    //     // Add your custom authentication logic here
    //     // for example, call super.logIn(request) to establish a session.
    //     // super.logIn(context.switchToHttp().getRequest())
    //     console.log(context.switchToHttp().getRequest());
    //     console.log("canActivate");
    //     return super.canActivate(context);
    //   }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

    // async canActivate(context: ExecutionContext): Promise<any> {
    //     console.log(context.switchToHttp().getRequest())
    //     // console.log(context);
    //     return super.canActivate(context);
    // }
}
