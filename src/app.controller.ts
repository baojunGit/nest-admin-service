import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 1. 固定路径：
  // 可以匹配到 get请求，http://localhost:3000/app/list
  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }
  // 可以匹配到 post请求，http://localhost:3000/app/list
  @Post('list')
  create(): string {
    return 'post request';
  }
  // 2. 配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:3000/app/user_xxx
  @Get('user_*')
  getUser() {
    return 'getUser';
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:3000/app/list/xxxx
  @Put('list/:id')
  update() {
    return 'update';
  }

  // 注意：@Put("list/:id")已经满足了,就不会继续往下匹配了，
  // 所以 @Put("list/user")装饰的方法应该写在它之前
  @Put('list/user')
  updateUser() {
    return { userId: 1 };
  }
}
