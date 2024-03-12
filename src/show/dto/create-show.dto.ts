import { Type } from 'class-transformer';
import { ValidateNested, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { Show, Seat, ShowDate } from '../entities/show.entity';

class ShowDateDto {
  @IsNotEmpty()
  datetime: Date;
}

export class CreateShowDto extends PickType(Show, [
  'showName',
  'showInfo',
  'venue',
  'category',
  'image',
  'dates',
  'seats',
] as const) {
  @IsString()
  @IsNotEmpty()
  showName: string;

  @IsString()
  @IsNotEmpty()
  showInfo: string;

  @IsString()
  venue: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShowDate)
  dates: ShowDate[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Seat)
  seats: Seat[];
}
