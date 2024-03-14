import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';
@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 이메일
   * @example "user@email.com"
   */
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  /**
   * 비밀번호
   * @example "1234"
   */
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  /**
   * 포인트
   * @example 1000000
   */
  @Column({ type: 'int', default: 0, nullable: false })
  point: number;

  /**
   * 관리자 여부
   * @example true
   */
  @Column({ type: 'boolean', nullable: false, default: false })
  is_admin: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
