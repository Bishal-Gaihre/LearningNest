import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Bishal Gaihre', description: 'Updated user full name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'bishal.updated@example.com', description: 'Updated unique email address' })
  @IsEmail()
  @IsOptional()
  email?: string;
}