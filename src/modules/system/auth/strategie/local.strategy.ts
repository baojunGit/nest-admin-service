import { compareSync } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/system/user/entities/user.entity';

// 定义了一个LocalStorage
// 继承至@nestjs/passport提供的PassportStrategy类, 接受两个参数
// 第一个参数: Strategy，你要用的策略，这里是passport-local
// 第二个参数:是策略别名，上面是passport-local,默认就是local

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // 接着调用super传递策略参数，
    // 这里如果传入的就是username和password，可以不用写，
    // 使用默认的参数就是，比如我们是用邮箱进行验证，
    // 传入的参数是email, 那usernameField对应的value就是email
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // validate是LocalStrategy的内置方法，
  // 主要就是现实了用户查询以及密码对比，因为存的密码是加密后的，
  // 没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码。
  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      // 注意要通过addSelect添加password查询，
      // 否则无法做密码对比
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }

    return user;
  }
}
