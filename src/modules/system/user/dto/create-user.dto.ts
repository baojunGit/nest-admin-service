import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户昵称' })
  @IsNotEmpty({ message: '用户名不为空' })
  username: string;

  @ApiProperty({ description: '账号' })
  @IsNotEmpty({ message: '用户昵称不为空' })
  nickname: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '手机号' })
  phone: string;

  @ApiProperty({ description: '用户信息' })
  @IsNotEmpty({ message: '用户信息不为空' })
  info: string;

  @ApiProperty({ description: '密码' })
  @MinLength(6, {
    message: '密码不少于六位数',
  })
  @IsNotEmpty({ message: '密码不为空' })
  password: string;

  @ApiProperty({ description: '用户角色' })
  role: string;
}
