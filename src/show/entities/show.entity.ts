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
@Index('idx_show_name', ['showName'], { unique: true })
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showName: string;

  @Column({ type: 'varchar', nullable: false })
  showInfo: string;

  @Column({ type: 'varchar', nullable: true })
  venue: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @OneToMany(() => ShowDate, (showDate) => showDate.show, {
    cascade: true,
  })
  dates: ShowDate[];

  @OneToMany(() => Seat, (seat) => seat.show, {
    cascade: true,
  })
  seats: Seat[];

  @OneToMany(() => Reservation, reservation => reservation.show)
reservations: Reservation[];

}
@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  seatNumber: string;

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
