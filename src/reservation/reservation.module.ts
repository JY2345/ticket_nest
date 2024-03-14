import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { User } from '../user/entities/user.entity';
import { Show, Seat } from '../show/entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Show, Seat])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
