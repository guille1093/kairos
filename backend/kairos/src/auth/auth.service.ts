import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { UsernamePasswordNoExistsException } from 'src/users/users.exception';
import { JWTPayloadInterface } from 'src/app/api.interface';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly userService: UsersService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async validateUser(params: { username: string; password: string; googleID?: string }): Promise<User> {
    const user = await this.userService.getBy({
      query: { username: params.username },
      withPassword: true
    });

    if (user && (await bcrypt.compare(params.password, user.password))) {
      user.password = undefined;
      return user;
    }
    throw new UsernamePasswordNoExistsException();
  }

  async validateGoogleUser(params: { googleID: string; name: string; lastname: string; email: string }): Promise<User> {
    console.log('Validating Google User');
    try {
      const user: User = await this.userService.getBy({
        query: { email: params.email }
      });

      const file: any = null;
      const updatedUser = await this.userService.update(file, {
        guid: user.guid,
        body: {
          googleID: params.googleID,
          roleGuid: user.role.guid
        },
        updatedByGUID: user.guid
      });
      console.log('User updated');
      const response = updatedUser;
      console.log('User response', response);
      return updatedUser;
    } catch (error) {
      console.log('User does not exist, creating new user...');
      const file: any = null;
      const newUser = await this.userService.create(file, {
        body: {
          password: '',
          name: params.name,
          lastname: params.lastname,
          email: params.email,
          username: params.email,
          googleID: params.googleID,
          roleGuid: 'R02',
          document: '',
          phone: '',
          address: '',
          birthdate: undefined,
          profileImage: '',
          documentSideA: '',
          documentSideB: '',
          backgroundCheck: '',
          category: '[]',
          paymentMethods: '[]',
          backgroundCheckExpirationDate: undefined,
          mapAdress: '',
          backgroundCheckDate: undefined
        }
      });
      return newUser;
    }
  }

  async generateAccessToken(params: { user: User }): Promise<{ token: string; user: User }> {
    const payload: JWTPayloadInterface = {
      guid: params.user.guid,
      role: params.user.role.guid,
      username: params.user.username
    };
    console.log('Payload', payload);
    console.log('User', params.user);
    return {
      token: this.jwtService.sign(payload),
      user: params.user
    };
  }

  async validateAccessToken(params: { token: string }): Promise<JWTPayloadInterface> {
    return this.jwtService.verify(params.token);
  }
}
