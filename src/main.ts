import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('api');
  // 全局注册错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册成功拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局注册管道
  app.useGlobalPipes(new ValidationPipe());
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    // 测试token的接口
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 解决跨域问题
  const options = {
    // 通配符”*”, 允许所有域（域名/IP）访问
    origin: '*',
    // 是否允许客户端请求携带Credentials(凭证)。Credentials可以是 cookies,
    // authorization headers 或 TLS client certificates.(一般可能携带cookies的情况比较多)。
    // 该响应头只能是true或者不设置
    credentials: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // allowedHeaders: 'Content-Type, Accept',
  };
  app.enableCors(options);

  await app.listen(8888);
}
bootstrap();
