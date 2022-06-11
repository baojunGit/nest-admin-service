import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
@ApiTags('网站用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * @description 获取所有数据列表接口
   */
  // 添加装饰器进行接口说明
  @ApiOperation({ summary: '获取用户列表' })
  @Get()
  async index() {
    return this.userService.findAll();
  }
}
