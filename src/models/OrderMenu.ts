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

  @ManyToOne(() => Menu, (menu) => menu.id)
  item_id: Menu;

  // @OneToOne(() => Menu, (menu) => menu.item_id)
  // @JoinColumn()
  // item_id: Menu
  /*
  * Проблема с созданием дублирующего элемента меню в ордерМеню при создании заказа.
  * Было исправлено, но теперь при добавлении блюда выводит ошибку. Были изменены связи в ордерменю и в меню
  * */
}
