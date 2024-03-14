import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { Show, Seat } from '../show/entities/show.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  /**
   * 예매하기
   * @param createReservationDto
   */
  async reserve(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return await this.seatRepository.manager.transaction(async (manager) => {
      const { user_id, show_id, seat_number, reservation_time } =
        createReservationDto;

      const seat = await manager.findOne(Seat, {
        where: { show: { id: show_id }, seat_number: seat_number },
        lock: { mode: 'pessimistic_write' },
      });

      if (!seat) {
        throw new NotFoundException('해당 공연에 지정된 좌석이 없습니다.');
      }

      const existingReservation = await this.reservationRepository.findOne({
        where: { show: { id: show_id }, seat_number: seat_number },
      });

      if (existingReservation) {
        throw new ConflictException('해당 좌석은 이미 예매되었습니다.');
      }

      const user = await this.userRepository.findOneBy({ id: user_id });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      const show = await this.showRepository.findOneBy({ id: show_id });
      if (!show) {
        throw new NotFoundException('해당 공연을 찾을 수 없습니다.');
      }

      let ticketPrice = seat.price;

      if (user.point < ticketPrice) {
        throw new ConflictException(
          '보유 포인트가 부족하여 예매할 수 없습니다.',
        );
      }

      const newReservation = manager.create(Reservation, {
        user,
        show,
        seat_number,
        reservationTime: reservation_time,
      });
      await manager.save(newReservation);

      user.point -= ticketPrice;
      await manager.save(user);

      return newReservation;
    });
  }

  /**
   * 나의 예약 목록
   * @param createReservationDto
   */
  async findReservationByLoginUser(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['show', 'user'],
      order: {
        reservation_time: 'DESC',
      },
    });
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  
  /**
   * 예매 삭제 및 포인트 환불
   * @param reservationId 
   * @param userId 
   */
  async cancelReservation(reservationId: number, userId: number): Promise<void> {
    return await this.reservationRepository.manager.transaction(async manager => {

      const reservation = await manager.findOne(Reservation, {
        where: {
          id: reservationId,
          user: { id: userId }
        },
        relations: ['show', 'user']
      });
  
      if (!reservation) {
        throw new NotFoundException('예약 정보를 찾을 수 없습니다.');
      }
  
      const seat = await manager.findOne(Seat, {
        where: {
          show: { id: reservation.show.id },
          seat_number: reservation.seat_number
        }
      });
  
      if (!seat) {
        throw new NotFoundException('좌석 정보를 찾을 수 없습니다.');
      }
  
      const refundPoints = seat.price;
  
      reservation.user.point += refundPoints;
      await manager.save(reservation.user);
  
      await manager.remove(reservation);
    });
  }
  
}
