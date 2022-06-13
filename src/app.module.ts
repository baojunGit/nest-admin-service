import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env';
// import { User } from './modules/system/user/entities/user.entity';
import { UserModule } from './modules/system/user/user.module';
import { AuthModule } from './modules/system/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // 数据库类型
        type: 'mysql',
        // 数据表实体，如果配置了自动加载实体，就不用配置
        // entiies: [User],
        // 主机，默认为localhost
        host: configService.get('DB_HOST', '127.0.0.0'),
        // 端口号
        port: configService.get<number>('DB_PORT', 3306),
        // 用户名
        username: configService.get('DB_USER', 'root'),
        // 密码
        password: configService.get('DB_PASSWORD', 'lbj*123456'),
        // 数据库名
        database: configService.get('DB_DATABASE', 'admin_manage'),
        // charset: 'utf8mb4',
        // 服务器上配置的时区
        timezone: '+08:00',
        // synchronize 为 true 时在项目启动的时候。就会进行表同步。
        // 但是正式环境如果将表同步交给这个属性可会出大事。
        // 如果修改了实体导致实体与表结构不同。会进行强替换。导致数据丢失。
        synchronize: true,
        // autoLoadEntities 的方式自动载入实体，
        // 每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
        autoLoadEntities: true,
      }),
    }),
    // 将业务模块注入到 app.module.ts
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
