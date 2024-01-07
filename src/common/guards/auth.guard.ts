import {
   Injectable,
   CanActivate,
   ExecutionContext,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private jwtService: JwtService) {}
   canActivate(
      context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      const token: string = this.extractTokenFromCookies(req);

      console.log('Token:', token);
      if (token) {
         try {
            const tokenData = this.jwtService.verify(token, {
               secret: process.env.JWT_SECRET,
            });
            if (!tokenData) return false;
            console.log('TOKEN DATA:', tokenData);
            req['user'] = tokenData.sub;
            return true;
         } catch (error) {
            throw new UnauthorizedException();
         }
      }
      throw new UnauthorizedException();
   }
   private extractTokenFromCookies(request: Request): string {
      return request.cookies.token;
   }
}
