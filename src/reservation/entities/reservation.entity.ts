import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Show } from '../../show/entities/show.entity'; 
@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Show, show => show.reservations)
  show: Show;

  @Column({ type: 'timestamp', nullable: false })
  reservation_time: Date;

  @Column({ type: 'varchar', nullable: true })
  seat_number: string;

}
