import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  getHello(): string {
    return 'Hello World!';
  }

  async ping(): Promise<string> {
    return await this.redis.set('guanwu', '2222');
  }
}
