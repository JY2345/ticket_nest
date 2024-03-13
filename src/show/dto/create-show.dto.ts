import { Type } from 'class-transformer';
import { ValidateNested, IsString, IsNotEmpty, IsArray } from 'class-validator';

class ShowDateDto {
  @IsNotEmpty()
  datetime: Date;
}

class SeatDto {
  @IsString()
  grade: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  seatNumber: string;
}

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연명을 입력하세요.' })
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
  @Type(() => ShowDateDto)
  dates: ShowDateDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
