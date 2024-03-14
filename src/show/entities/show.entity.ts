import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity({
  name: 'shows',
})
@Index('idx_show_name', ['show_name'], { unique: true })
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  show_name: string;

  @Column({ type: 'varchar', nullable: false })
  show_info: string;

  @Column({ type: 'varchar', nullable: true })
  venue: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'boolean', default: false })
  is_free_seating: boolean;

  @Column({ type: 'int', nullable: true })
  free_seating_price: number;

  @OneToMany(() => ShowDate, (showDate) => showDate.show, {
    cascade: true,
  })
  dates: ShowDate[];

  @OneToMany(() => Seat, (seat) => seat.show)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];
}
@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  seat_number: string;

  @ManyToOne(() => Show, (show) => show.seats)
  show: Show;
}

@Entity({
  name: 'showDates',
})
export class ShowDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  datetime: Date;

  @ManyToOne(() => Show, (show) => show.dates)
  show: Show;
}
