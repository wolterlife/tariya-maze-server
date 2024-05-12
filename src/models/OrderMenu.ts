import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './Order';
import {Menu} from './Menu';

@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @ManyToOne(() => Order, (order) => order.id, {onDelete: 'CASCADE'})
  order: Order;

  @OneToOne(() => Menu, (menu) => menu.item_id)
  @JoinColumn()
  item_id: Menu
}
