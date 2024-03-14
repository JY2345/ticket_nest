import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

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
  
  /**
   * 공연명
   * @example "레미제라블"
   */
  @IsString()
  @IsNotEmpty({ message: '공연명을 입력하세요.' })
  show_name: string;

  /**
   * 공연 내용
   * @example "한국에서는 장발장으로 출판되기도"
   */
  @IsString()
  @IsNotEmpty({ message: '공연 내용을 입력하세요.' })
  show_info: string;

  /**
   * 장소
   * @example "국립극장"
   */
  @IsString()
  venue: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsBoolean()
  is_free_seating: boolean;

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
