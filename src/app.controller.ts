import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';

@Controller('')
export class AppController {
   @Get()
   @Render('index')
   @UseGuards(AuthGuard)
   home(@Req() req) {
      console.log(req.user);

      return { message: 'Welcome again', name: req.user };
   }

   @Get('/login')
   @Render('login')
   login() {
      return {};
   }
}
