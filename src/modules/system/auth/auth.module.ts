// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/system/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStorage } from './strategie/local.strategy';
import { UserModule } from '../user/user.module';
import { JwtStorage } from './strategie/jwt.strategy';

// 这里不建议将秘钥写死在代码也， 它应该和数据库配置的数据一样，从环境变量中来
// 不然secret泄露了，别人一样可以生成相应的的token，随意获取你的数据
// const jwtModule = JwtModule.register({
//     secret:"xxx"
// })

// 注意不要忘记在.env文件中设置SECRET配置信息
// const jwtModule = JwtModule.registerAsync({
//   inject: [ConfigService],
//   useFactory: async (configService: ConfigService) => {
//     return {
//       // 根据环境变量获取密钥，如果没有就给默认值test123456
//       secret: configService.get('JWT_SECRET', 'test123456'),
//       signOptions: { expiresIn: '4h' },
//     };
//   },
// });

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
})
export class AuthModule {}
