import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
   canActivate(
      context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {
      const req: Request = context.switchToHttp().getRequest() as Request;
      const headers: Headers = req.headers;
      const token: string = headers['token'];
      console.log('Token:', token);

      if (token) return true;
      return false;
   }
}
