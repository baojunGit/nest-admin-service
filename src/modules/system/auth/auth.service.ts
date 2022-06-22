import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CaptchaService } from 'src/utils/captcha';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
// 这里nanoid要使用V3版本，不然会报错
// V4不支持 CommonJS，要等兼容做好再升级
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private captchaService: CaptchaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * @description 创建验证码并缓存加入redis缓存
   * @param captcha 验证码长宽
   * @returns svg & id obj
   */
  async createCaptcha() {
    const svg = await this.captchaService.getCaptcha();
    console.log(svg);
    const uuid = nanoid(8);
    // Buffer是node里的一个模块，这个模块的出现是因为js没有阅读和操作二进制数据流而出现的
    // Buffer.from()从字符串或者数组创建一个buffer，将内容写入刚刚申请的内存中
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64',
      )}`,
      // 生成一个唯一的id标识，方便查询
      id: uuid,
    };
    // 5分钟过期时间
    await this.redis.set(
      `admin:captcha:img:${result.id}`, // redis分层目录存储验证码信息
      svg.text, // 验证码的文本内容
      'EX', //设置键的过期时间为 second 秒；PX设置键的过期时间为 millisecond 毫秒
      60 * 5, // 存储五分钟
    );
    return result;
  }

  /**
   * @description 校验图片验证码
   */
  async checkImgCaptcha(id: string, code: string): Promise<void> {
    const result = await this.redis.get(`admin:captcha:img:${id}`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException(10002);
    }
    // 校验成功后移除验证码
    await this.redis.del(`admin:captcha:img:${id}`);
  }

  // 生成token的方法
  // createToken(user: Partial<User>) {
  //   return this.jwtService.sign(user);
  // }

  // interface User {
  //   id: number;
  //   age: number;
  //   name: string;
  // };
  // type PartialUser = Partial<User>
  // 相当于: type PartialUser = { id?: number; age?: number; name?: string; }

  /**
   * @description Jwt登陆验证
   * @param user
   * @returns
   */

  async login(user: Partial<User>) {
    // 生成token
    const token = this.jwtService.sign({
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
