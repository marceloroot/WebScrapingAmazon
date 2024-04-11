import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmazonModule } from './amazon/amazon.module';

@Module({
  imports: [AmazonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
