import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [UserModule, SeedsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
