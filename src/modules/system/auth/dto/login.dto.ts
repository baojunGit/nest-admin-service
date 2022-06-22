import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  password: string;

  @ApiProperty({ description: '验证码标识' })
  @IsNotEmpty({ message: '请输入验证码标识id' })
  captchaId: string;

  @ApiProperty({ description: '用户输入的验证码' })
  @IsNotEmpty({ message: '请输入验证码' })
  @MinLength(4)
  @MaxLength(4)
  verifyCode: string;
}
