import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentMethodAlreadyExistsException extends HttpException {
  constructor() {
    super('PaymentMethod already exists', HttpStatus.CONFLICT);
  }
}

export class PaymentMethodNoExistsException extends HttpException {
  constructor() {
    super('PaymentMethod does not exist', HttpStatus.NOT_FOUND);
  }
}

export class CustomException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
