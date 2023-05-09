import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { customMessage } from 'src/common/custom.message';

export class CreateUserDto {
  @IsEmail({}, { message: customMessage('IsEmail') })
  @IsString({ message: customMessage('IsString') })
  @IsNotEmpty({ message: customMessage('IsNotEmpty') })
  @ApiProperty()
  email: string;

  @IsString({ message: customMessage('IsString') })
  @IsNotEmpty({ message: customMessage('IsNotEmpty') })
  @ApiProperty()
  password: string;
}
