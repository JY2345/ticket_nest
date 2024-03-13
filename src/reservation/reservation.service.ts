import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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
  async reserve(createReservationDto: CreateReservationDto) : Promise<Reservation> {
    
    const { user_id, show_id, seat_number, reservation_time } = createReservationDto;
    
    const user = await this.userRepository.findOneBy({ id: user_id });
    const show = await this.showRepository.findOneBy({ id: show_id });
    if (!show) {
      throw new NotFoundException('해당 공연을 찾을 수 없습니다.');
    }

    let ticketPrice = show.free_seating_price;
    if (!show.is_free_seating) {
      const seat = await this.seatRepository.findOne({
        where: { 
          show: { id: show_id }, 
          seat_number 
        },
      });
      if (!seat) {
        throw new NotFoundException('해당 공연에 지정된 좌석이 없습니다.');
      }
      ticketPrice = seat.price;
    }

    const existingReservation = await this.reservationRepository.findOne({
      where: {
        show: { id: show_id },
        seat_number,
      },
    });
    if (existingReservation) {
      throw new ConflictException('해당 좌석은 이미 예매되었습니다.');
    }

    const reservation = this.reservationRepository.create({
      user: user,
      show: show,
      reservation_time: reservation_time, 
      seat_number: seat_number, 
    });

    await this.reservationRepository.save(reservation);
    return reservation;  
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

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
