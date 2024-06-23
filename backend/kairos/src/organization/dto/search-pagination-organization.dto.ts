import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchOrganizationPaginationDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  guid?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  isActive?: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({ required: true, default: 0 })
  @IsNumber()
  @IsOptional()
  offset?: any;

  @ApiProperty({ required: true, default: 10 })
  @IsNumber()
  pageSize?: any;

  @ApiProperty({ required: false, type: 'string', default: 'name' })
  @IsOptional()
  @IsString()
  orderBy?: 'name' | 'created' = 'name';

  @ApiProperty({ required: false, type: 'string', default: 'ASC' })
  @IsOptional()
  @IsString()
  orderType?: 'ASC' | 'DESC' = 'ASC';
}
