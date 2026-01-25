import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SeedsModule } from './seeds/seeds.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [UserModule, SeedsModule, AuthenticationModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
