import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CaptchaService } from 'src/utils/captcha';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private captchaService: CaptchaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * 创建验证码并缓存加入redis缓存
   * @param captcha 验证码长宽
   * @returns svg & id obj
   */
  async createCaptcha() {
    const svg = await this.captchaService.getCaptcha();
    console.log(svg);
    // Buffer是node里的一个模块，这个模块的出现是因为js没有阅读和操作二进制数据流而出现的
    // Buffer.from()从字符串或者数组创建一个buffer，将内容写入刚刚申请的内存中
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64',
      )}`,
      // 生成一个唯一的id标识，方便查询
      id: nanoid(),
    };
    // 5分钟过期时间
    await this.redis.set('tag', svg.text, 'EX', 60 * 5);
    return result;
  }

  // 生成token的方法
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { token };
  }

  // 获取用户信息接口，用于验证携带的token是否正确
  async getUser(user) {
    return await this.userService.findById(user);
  }
}
