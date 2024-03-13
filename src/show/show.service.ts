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
      dates: createShowDto.dates.map((date) => ({
        ...date,
      })),
      seats: createShowDto.seats.map((seat) => ({
        ...seat,
      })),
    });

    await this.showRepository.save(show);
    return show;
  }

  async findAll(showName?: string) {
    if (showName) {
      return await this.showRepository.find({
        where: {
          showName: showName,
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
