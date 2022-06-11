import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // Repository任何实体的常规存储库
    // Repository，需要@nestjs/typeorm的InjectRepository来注入实体
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 异步代码，必须要async await才能返回数据
  async findAll(): Promise<User[]> {
    const all = await this.usersRepository.find();
    console.log(all);
    return all;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
