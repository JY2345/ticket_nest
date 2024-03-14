import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show, Seat, ShowDate } from './entities/show.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Seat, ShowDate, Reservation])],
  providers: [ShowService],
  controllers: [ShowController],
})
export class ShowModule {}
