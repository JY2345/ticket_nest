import { Injectable, NotFoundException } from '@nestjs/common';
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

  async registShow(createShowDto: CreateShowDto): Promise<Show> {
    const show = this.showRepository.create({
      ...createShowDto,
      dates: createShowDto.dates.map((date) => ({ ...date })),
    });
  
    await this.showRepository.save(show);
  
    if (!createShowDto.is_free_seating) {
      const seats = createShowDto.seats.map((seat) => this.seatRepository.create({
        ...seat,
        show, // 현재 저장된 Show 엔티티에 대한 참조
      }));
  
      await this.seatRepository.save(seats);
    }
  
    return show;
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

  update(id: number, updateShowDto: UpdateShowDto) {
    return `This action updates a #${id} show`;
  }

  remove(id: number) {
    return `This action removes a #${id} show`;
  }
}
