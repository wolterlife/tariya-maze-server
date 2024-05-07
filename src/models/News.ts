import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title1: string;

  @Column()
  title2: string;

  @Column()
  description: string;
}
