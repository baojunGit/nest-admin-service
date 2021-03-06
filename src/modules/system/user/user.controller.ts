import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('网站用户')
@Controller('user')
// 过滤掉用户密码password
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description 注册用户
   */
  @ApiOperation({ summary: '注册用户' })
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  /**
   * @description 获取所有数据列表接口
   */
  // 添加装饰器进行接口说明
  @ApiOperation({ summary: '获取用户列表' })
  // swagger文档设置token
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return this.userService.findAll();
  }
}
