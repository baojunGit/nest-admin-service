import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不为空' })
  username: string;

  @ApiProperty({ description: '账号' })
  @IsNotEmpty({ message: '账号不为空' })
  account: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不为空' })
  password: string;

  @ApiProperty({ description: '用户角色' })
  role: string;
}
