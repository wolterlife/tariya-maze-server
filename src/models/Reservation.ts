import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  count: number;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.reservations, {onDelete: 'CASCADE'})
  user: User;
}
