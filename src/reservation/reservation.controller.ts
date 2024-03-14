import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../utils/userInfo.decorator';
import { User } from '../user/entities/user.entity';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('reserve')
  create(
    @UserInfo() user: User,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    createReservationDto.user_id = user.id;
    return this.reservationService.reserve(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('find-user-reservations')
  async findUserReservations(@UserInfo() user: User) {
    return await this.reservationService.findReservationByLoginUser(+user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  cancelReservation(
    @UserInfo() user: User,
    @Param('id') id: string) {
    return this.reservationService.cancelReservation(+id, +user.id);
  }
}
