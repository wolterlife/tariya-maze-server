import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './Order';
import {Reservation} from './Reservation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  secondName: string;

  @Column()
  firstName: string;

  @Column()
  patronymic: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  dateOfBirth: string;

  @Column()
  mail: string;

  @Column()
  destination: string;

  @Column()
  roles: string;

  @OneToMany(() => Order, (order) => order.user, {nullable: true})
  orders: Order[]

  @OneToMany(() => Reservation, (reservation) => reservation.user, {nullable: true})
  reservations: Reservation[]
}
