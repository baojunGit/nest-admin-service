import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

// @Entity注解能够实现实体表到数据库表的映射
@Entity()
export class User {
  // 自动生成的主键
  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn()
  id: number;

  // 索引字段
  @Index()
  // @Column是对应列的映射，可以设置对应列的类型
  @Column({
    name: 'user_name',
    comment: '用户昵称',
    length: 30,
  })
  username: string;

  @Column({
    comment: '用户账号',
    length: 30,
  })
  account: string;

  @Exclude()
  @Column({
    // 定义在进行查询时选择是否可以显示，默认true，false就是不显示。
    // 只对用于查询时有效，save方法返回的数据仍旧包含password
    // 方法2（适用多种场景）：
    // 用class-transformer提供的Exclude来序列化，对返回的数据实现过滤掉password字段
    // select: false,
    // 设置密码可为空
    nullable: true,
  })
  password: string;

  @Column({ default: '无门无派' })
  info: string;

  @Column({ default: '超级管理员' })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  // 使用了装饰器@BeforeInsert来装饰encryptPwd方法，
  // 表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的
  @BeforeInsert()
  async encryptPwd() {
    if (!this.password) return;
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
