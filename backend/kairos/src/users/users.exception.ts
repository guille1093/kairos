import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}

export class UserNoExistsException extends HttpException {
  constructor() {
    super('User does not exist', HttpStatus.NOT_FOUND);
  }
}

export class UsernamePasswordNoExistsException extends HttpException {
  constructor() {
    super('Wrong username and/or password', HttpStatus.NOT_FOUND);
  }
}

//custom exceptions that recieve a message
export class CustomException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
