import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {OrderMenu} from './OrderMenu';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  val: string;

  @Column()
  description: string;

  @Column()
  imgLink: string;

  @Column()
  itemAdd: string;

  @Column()
  type: string;

  @Column()
  isDiscount: boolean;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.item_id)
  item_id: OrderMenu[]
}
