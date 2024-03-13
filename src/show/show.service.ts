import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show, Seat } from './entities/show.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async create(createShowDto: CreateShowDto): Promise<Show> {
    const show = this.showRepository.create({
      ...createShowDto,
      seats: [],
    });

    const seats = createShowDto.seats.map((seatDto) => {
      let seat = this.seatRepository.create({
        ...seatDto,
        show: show,
      });
      return seat;
    });
    show.seats = await this.seatRepository.save(seats);

    await this.showRepository.save(show);
    return show;
  }

  findAll() {
    return `This action returns all show`;
  }

  findOne(id: number) {
    return `This action returns a #${id} show`;
  }

  update(id: number, updateShowDto: UpdateShowDto) {
    return `This action updates a #${id} show`;
  }

  remove(id: number) {
    return `This action removes a #${id} show`;
  }
}
