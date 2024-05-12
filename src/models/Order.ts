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
  isActive: boolean;

  @Column()
  date: string;

  @Column()
  dest: string;

  @Column()
  comment: string;

  @Column()
  isDiscount: boolean;

  @ManyToOne(() => User, (user) => user.orders, {onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => OrderMenu, (OrderMenu) => OrderMenu.order)
  orders: OrderMenu[]
}
