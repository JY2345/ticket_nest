import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show, Seat } from './entities/show.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async registShow(createShowDto: CreateShowDto): Promise<Show> {
    return await this.showRepository.manager.transaction(async (transactionalEntityManager) => {
      if (createShowDto.is_free_seating && createShowDto.free_seating_price > 50000) {
        throw new ConflictException('자유석 가격은 50000을 초과할 수 없습니다.');
      }
  
      const show = this.showRepository.create({
        ...createShowDto,
        dates: createShowDto.dates.map((date) => ({ ...date })),
      });
      await transactionalEntityManager.save(show);
    
      if (!createShowDto.is_free_seating) {
        const overpricedSeat = createShowDto.seats.find(seat => seat.price > 50000);
        if (overpricedSeat) {
          throw new ConflictException('등록할 좌석 가격은 50000을 초과할 수 없습니다.');
        }
  
        const seats = createShowDto.seats.map((seat) => this.seatRepository.create({
          ...seat,
          show, 
        }));
  
        await transactionalEntityManager.save(seats);
      }
    
      return show;
    }); 
  }

  async findAll(show_name?: string) {
    if (show_name) {
      return await this.showRepository.find({
        where: {
          show_name: show_name,
        },
      });
    } else {
      return await this.showRepository.find();
    }
  }

  async findOne(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (!show) {
      throw new NotFoundException('해당 공연이 없습니다.');
    }
    return show;
  }

  async findAvailableSeats(showId: number): Promise<any[]> {
    
    const allSeats = await this.seatRepository.find({
      where: { show: { id: showId } },
    });  

    const reservedSeats = await this.reservationRepository.find({
      where: { show: { id: showId } },
      select: ['seat_number'], 
    });
    const reservedSeatNumbers = reservedSeats.map((reservation) => reservation.seat_number);
  
    const availableSeats = allSeats.filter(
      (seat) => !reservedSeatNumbers.includes(seat.seat_number) 
    ).map((seat) => ({
      seat_num: seat.seat_number, 
      grade: seat.grade,
      price: seat.price,
    }));

    return availableSeats;
  }


  update(id: number, updateShowDto: UpdateShowDto) {
    return `This action updates a #${id} show`;
  }

  remove(id: number) {
    return `This action removes a #${id} show`;
  }
}
