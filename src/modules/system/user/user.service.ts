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

  async findAll(): Promise<User[]> {
    const all = await this.usersRepository.find();
    return all;
  }

  /* id查询用户 */
  async findById(user) {
    // console.log(await this.usersRepository.findOne({ where: { id: user.id } }));
    // 注意这边写成findOne(user.id)或者find(user)都不行，跟版本写法有关
    return await this.usersRepository.findOne({ where: { id: user.id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
