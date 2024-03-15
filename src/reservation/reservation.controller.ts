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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('예약 정보')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /**
   * 예매하기
   * @param user
   * @param createReservationDto 
   * @returns 
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('reserve')
  create(
    @UserInfo() user: User,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    createReservationDto.user_id = user.id;
    return this.reservationService.reserve(createReservationDto);
  }

  /**
   * 내 예매 확인
   * @param user
   * @returns 
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('find-user-reservations')
  async findUserReservations(@UserInfo() user: User) {
    return await this.reservationService.findReservationByLoginUser(+user.id);
  }

  /**
   * 예매 취소
   * @param user 
   * @param id 
   * @returns 
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Delete(':id')
  cancelReservation(
    @UserInfo() user: User,
    @Param('id') id: string) {
    return this.reservationService.cancelReservation(+id, +user.id);
  }
}
