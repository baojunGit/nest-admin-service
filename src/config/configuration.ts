/** 导入配置文件，定义配置接口  */

import { Logger } from '@nestjs/common';

// 定义配置接口
export interface IConfig {
  /** jwt token 密码钥 */
  jwt?: {
    secret: string;
  };
  /**
   * 数据库配置
   */
  database?: {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    autoLoadModels: boolean; // 如果为true，模型将自动载入（默认:false)
    timezone?: string; // 服务器上配置的时区
    synchronize?: boolean; //如果为true，自动载入的模型将同步
    // 是否打印日志,执行sql语句时候输出原生sql,也可以配置成一个数组["query", "error", "schema"]指定sql的执行类型
    logging?: any;
  };
}

// 根据环境变量导入配置
export default () => {
  let envConfig: IConfig;
  try {
    envConfig = require(`./config.${process.env.NODE_ENV}`).default;
  } catch (e) {
    const logger = new Logger('ConfigModule');
    logger.error(e);
  }
  // 返回环境配置
  return envConfig;
};
