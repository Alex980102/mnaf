import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'The email of the User',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the User',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
  })
  @IsNotEmpty()
  name: string;
}
