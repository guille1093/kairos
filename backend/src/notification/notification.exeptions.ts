import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationAlreadyExistsException extends HttpException {
  constructor() {
    super('Notification already exists', HttpStatus.CONFLICT);
  }
}

export class NotificationNoExistsException extends HttpException {
  constructor() {
    super('Notification does not exist', HttpStatus.NOT_FOUND);
  }
}

export class CustomException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
