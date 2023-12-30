import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

@Injectable()
export default class RedisConfig implements RedisOptions {
   host?: string = this.configService.get('REDIS_HOST');
   port?: number = this.configService.get('REDIS_PORT');
   password?: string = this.configService.get('REDIS_PASS') || null;
   constructor(private configService: ConfigService) {}
}
