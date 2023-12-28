import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import redisConfig from 'src/configs/database/redis.config';

@Injectable()
export class RedisService {
   private readonly redisClient: Redis;
   private readonly redisOptions = redisConfig();
   constructor() {
      this.redisClient = new Redis(this.redisOptions);
   }

   async setValue(key: string, value: string): Promise<void> {
      await this.redisClient.set(key, value);
   }

   async getValue(key: string): Promise<string | null> {
      return await this.redisClient.get(key);
   }
}
