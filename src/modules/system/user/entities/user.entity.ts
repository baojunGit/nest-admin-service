import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Entity注解能够实现实体表到数据库表的映射
@Entity()
export class User {
  // 自动生成的主键
  @PrimaryGeneratedColumn()
  id: number;
  // 索引字段
  @Index()
  // @Column是对应列的映射，可以设置对应列的类型
  @Column({
    length: 100,
    type: 'varchar',
    comment: '用户名',
  })
  username: string;

  @Column()
  account: string;

  @Column({ default: true })
  info: string;

  @Column({ default: true })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
}
