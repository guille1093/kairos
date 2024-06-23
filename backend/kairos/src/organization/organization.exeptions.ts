import { HttpException, HttpStatus } from '@nestjs/common';

export class OrganizationAlreadyExistsException extends HttpException {
  constructor() {
    super('Organization already exists', HttpStatus.CONFLICT);
  }
}

export class OrganizationNoExistsException extends HttpException {
  constructor() {
    super('Organization does not exist', HttpStatus.NOT_FOUND);
  }
}

export class CustomException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
