import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExistsError extends HttpException {
  constructor(message?: string) {
    super(message || 'Not exists', HttpStatus.BAD_REQUEST);
  }
}
