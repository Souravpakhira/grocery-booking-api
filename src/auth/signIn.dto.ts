import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    default: 'user1',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    default: 'user1',
  })
  @IsNotEmpty()
  password: string;
}
