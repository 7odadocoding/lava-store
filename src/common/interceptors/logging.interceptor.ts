import {
   Injectable,
   NestInterceptor,
   ExecutionContext,
   CallHandler,
   Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
   private readonly logger = new Logger('HTTP');

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url, params, body, query } = request;

      this.logger.log(`Incoming Request - ${method} ${url}`);
      this.logger.log(`Params: ${JSON.stringify(params)}`);
      this.logger.log(`Query: ${JSON.stringify(query)}`);
      this.logger.log(`Body: ${JSON.stringify(body)}`);

      const now = Date.now();

      return next
         .handle()
         .pipe(
            tap(() =>
               this.logger.log(
                  `Outgoing Response - ${method} ${url} - ${
                     Date.now() - now
                  }ms`,
               ),
            ),
         );
   }
}
