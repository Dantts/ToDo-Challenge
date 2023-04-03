import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor(message?: string) {
    super(
      message || 'Client request has not been completed, because unauthorized',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
