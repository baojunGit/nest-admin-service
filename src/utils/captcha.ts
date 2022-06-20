import { Injectable } from '@nestjs/common';
import * as svgCapthcha from 'svg-captcha';

// 一个***Service被加上@Injectable()的注解之后，
// 就变成了一个可以被其他模块在构造器部分引用的参数，
// 在nest的提供者providers:[]中需要添加对应的***Service，
// 如：providers: [ ***Service ]，以便框架自动来处理依赖关系，并进行必要的实例化。

@Injectable()
export class CaptchaService {
  async getCaptcha(size = 4) {
    // 配置返回的图片
    const captcha = svgCapthcha.create({
      inverse: false, // 翻转颜色
      background: '#cc9966', // 背景颜色
      fontSize: 58, // 字体大小
      noise: 2, // 噪声线条数
      width: 100, // 宽度
      height: 40, // 高度
      size: size, // 验证码长度
      ignoreChars: '0Oli', // 验证码字符中排出0oli
    });
    return captcha;
  }
}
