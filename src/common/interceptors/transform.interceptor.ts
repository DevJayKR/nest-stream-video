import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const Info = {
  success: true,
  statusCode: 200,
};

export type Response<T> = typeof Info & {
  data: T;
};

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Text, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const { message, result } = data;

        if (result) {
          result.password = undefined;
        }

        return Object.assign(Info, { message, data: result });
      }),
    );
  }
}
