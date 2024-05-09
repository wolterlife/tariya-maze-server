import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {OrderMenu} from './OrderMenu';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  val: string;

  @Column()
  description: string;

  @Column()
  imgLink: string;
}
