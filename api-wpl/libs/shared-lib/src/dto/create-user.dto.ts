import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { RoleName } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsIn(Object.values(RoleName))
  @ApiPropertyOptional({enum: RoleName})
  role?: RoleName;

}
