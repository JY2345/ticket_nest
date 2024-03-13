import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show, Seat, ShowDate } from './entities/show.entity';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Seat, ShowDate])],
  providers: [ShowService],
  controllers: [ShowController],
})
export class ShowModule {}
