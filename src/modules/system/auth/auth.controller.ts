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
    return await this.authService.createCaptcha();
  }

  @ApiOperation({ summary: '登录接口' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req) {
    console.log(dto);
    await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    return await this.authService.login(req.user);
  }
}
