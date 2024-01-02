import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryConfig {
   constructor(configService: ConfigService) {
      const config = v2.config({
         cloud_name: configService.get('CLOUD_NAME'),
         api_key: configService.get('CLOUD_API_KEY'),
         api_secret: configService.get('CLOUD_API_SECRET'),
      });
      if (config) console.log('cloudinary configured successfully');
   }
}
