import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/system/user/user.module';
import { AuthModule } from './modules/system/auth/auth.module';
import configuration from './config/configuration';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [configuration],
    }),
    // 公共模块
    SharedModule,

    // 将业务模块注入到 app.module.ts
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
