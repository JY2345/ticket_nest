import { Type } from 'class-transformer';
import { ValidateNested, IsString, IsNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

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
  seat_number: string;
}

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연명을 입력하세요.' })
  show_name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 내용을 입력하세요.' })
  show_info: string;

  @IsString()
  venue: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsBoolean()
  is_free_seating : boolean;

  @IsOptional()
  @IsNumber({}, { message: '자유석 가격을 입력하세요.' })
  free_seating_price?: number; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShowDateDto)
  dates: ShowDateDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
