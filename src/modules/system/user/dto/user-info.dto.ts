import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '账号' })
  account: string;

  @ApiProperty({ description: '信息' })
  info: string;

  @ApiProperty({ description: '角色' })
  role: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;
}
