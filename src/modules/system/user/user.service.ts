import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // Repository任何实体的常规存储库
    // Repository，需要@nestjs/typeorm的InjectRepository来注入实体
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * @description 用户注册
   * @param createUser
   */
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.usersRepository.create(createUser);
    return await this.usersRepository.save(newUser);
  }

  // 异步代码，必须要async await才能返回数据
  async findAll(): Promise<User[]> {
    const all = await this.usersRepository.find();
    return all;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
