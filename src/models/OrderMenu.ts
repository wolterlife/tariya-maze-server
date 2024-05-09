import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './Order';
import {Menu} from './Menu';

@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  count: number;

  @ManyToOne(() => Order, (order) => order.id, {onDelete: 'CASCADE'})
  order: Order;

  @OneToOne(() => Menu, (menu) => menu.id)
  menu_id: Menu;
}
