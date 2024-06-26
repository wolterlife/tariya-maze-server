import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';
import {OrderMenu} from './OrderMenu';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  date: string;

  @Column()
  dest: string;

  @Column()
  comment: string;

  @Column()
  paymentValue: string;

  @Column()
  people: string;

  @ManyToOne(() => User, (user) => user.orders, {onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => OrderMenu, (OrderMenu) => OrderMenu.order)
  orders: OrderMenu[]
}
