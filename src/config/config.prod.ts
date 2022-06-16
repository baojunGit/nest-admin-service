/** 生产环境配置文件 */
import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // typeorm 配置
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadModels: true,
    // 根据实体自动创建数据库表，生产环境关闭
    synchronize: false,
    logging: false,
  },
});
