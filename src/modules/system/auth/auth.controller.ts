import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('captcha')
  async captcha() {
    return '测试验证码接口';
  }

  @ApiOperation({ summary: '登录接口' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.authService.login(req.user);
  }
}
