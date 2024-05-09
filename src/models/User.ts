import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './Order';
import {Role} from './Role';
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

  @OneToMany(() => Role, (role) => role.id)
  role_id: Role[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[]
}
