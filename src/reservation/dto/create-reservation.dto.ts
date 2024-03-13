import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '유저 정보를 찾을 수 없습니다.' })
  userId: number;

  @IsNumber()
  @IsNotEmpty({ message: '공연 정보를 찾을 수 없습니다.' })
  showId: number;

  @IsDateString({}, { message: '예약 시간을 올바른 날짜 형식으로 입력해주세요.' })
  reservationTime: Date;

  @IsString()
  @IsNotEmpty({ message: '좌석 번호를 입력해주세요.' })
  seatNumber: string;
}
