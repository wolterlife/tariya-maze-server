import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  user: string;

  @Column()
  stars: number;
}
