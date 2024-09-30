import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorsService {
  async notFound(message: string): Promise<any> {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: message,
      },
      HttpStatus.NOT_FOUND,
      {
        cause: message,
      },
    );
  }

  async unauthorized(message: string): Promise<any> {
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: message,
      },
      HttpStatus.UNAUTHORIZED,
      {
        cause: message,
      },
    );
  }

  async badRequest(message: string): Promise<any> {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: message,
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: message,
      },
    );
  }
}
