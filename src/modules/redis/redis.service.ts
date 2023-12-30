import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import RedisConfig from 'src/configs/database/redis.config';

@Injectable()
export class RedisService {
   private readonly redisClient: Redis;
   constructor(redisConfig: RedisConfig) {
      this.redisClient = new Redis(redisConfig);
   }

   async setValue(key: string, value: string): Promise<void> {
      await this.redisClient.set(key, value);
   }

   async getValue(key: string): Promise<string | null> {
      return await this.redisClient.get(key);
   }
}
