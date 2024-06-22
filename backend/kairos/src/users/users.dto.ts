import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from 'src/roles/role.enum';

export class LoginDTO {
  @ApiProperty({ required: true })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @MinLength(3)
  @MaxLength(70)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class googleOAuthDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  googleID: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  lastname: string;
}

export class CreateUserDTO {
  @ApiProperty({ required: true })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @MaxLength(10)
  @MinLength(7)
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsString()
  @IsOptional()
  birthdate: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(250)
  profileImage: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(250)
  documentSideA: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(250)
  documentSideB: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(250)
  backgroundCheck: string;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsString()
  @IsOptional()
  backgroundCheckDate: Date;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsString()
  @IsOptional()
  backgroundCheckExpirationDate: Date;

  @ApiProperty({ required: false })
  @MaxLength(150)
  @IsString()
  @IsOptional()
  mapAdress: string;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @MaxLength(50)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  googleID?: string;

  @ApiProperty({ required: true })
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isActive?: number;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  isProfessional?: number;

  @ApiProperty({ required: false })
  @MinLength(3)
  @MaxLength(70)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false, enum: RoleEnum, type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(RoleEnum, { each: true })
  roleGuid: RoleEnum | string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  availability?: {};

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isAvailable?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentMethods?: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }

export class SearchUserDTO {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  guid?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  isProfessional?: number;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  isActive?: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  googleID?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  category?: string;
}

export class SearchUserPaginationDTO {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  guid?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  isProfessional?: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  mapAdress?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  isActive?: number;

  @ApiProperty({ required: false, enum: RoleEnum, type: 'string' })
  @IsOptional()
  @IsEnum(RoleEnum, { each: true })
  roleGuid: RoleEnum | string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  createdByGuid?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  updatedByGuid?: string;

  @ApiProperty({ required: true, default: 0 })
  @IsOptional()
  offset?: any;

  @ApiProperty({ required: true, default: 10 })
  @IsOptional()
  pageSize?: any;

  @ApiProperty({ required: false, type: 'string', default: 'name' })
  @IsOptional()
  @IsString()
  orderBy?: 'name' | 'lastname' | 'username';

  @ApiProperty({ required: false, type: 'string', default: 'ASC' })
  @IsOptional()
  @IsString()
  orderType?: 'ASC' | 'DESC';

  @ApiProperty({ required: false, type: 'string', default: '' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false, type: 'string', default: '' })
  @IsOptional()
  @IsString()
  categoryID?: string;
}
