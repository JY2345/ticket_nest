import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '유저 정보를 찾을 수 없습니다.' })
  user_id: number;

  @IsNumber()
  @IsNotEmpty({ message: '공연 정보를 찾을 수 없습니다.' })
  show_id: number;

  @IsDateString(
    {},
    { message: '예약 시간을 올바른 날짜 형식으로 입력해주세요.' },
  )
  reservation_time: Date;

  @IsString()
  seat_number: string;
}
