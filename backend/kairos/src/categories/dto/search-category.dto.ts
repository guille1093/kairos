import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchCategoryDto {
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
  description?: string;

  @ApiProperty({ type: 'number', required: false })
  @IsOptional()
  @IsNumber()
  isActive?: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  createdByGuid?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  updatedByGuid?: string;
}
