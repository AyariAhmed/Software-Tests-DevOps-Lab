import { OrderLine } from '../../ordering/entities/orderLine.entity';
import { PlateRate } from '../../rating/entities/plateRate.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Plate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rate: number;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.plates, {
    eager: true,
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @OneToMany(() => PlateRate, (plateRate) => plateRate.plate)
  ratings: PlateRate[];

  @OneToMany(() => OrderLine, (orderLine) => orderLine.plate)
  orderLines: OrderLine[];

  constructor(
    name: string,
    description: string,
    rate: number,
    price: number,
    restaurant: Restaurant,
    imageUrl: string,
  ) {
    super();
    this.name = name;
    this.description = description;
    this.rate = rate;
    this.price = price;
    this.restaurant = restaurant;
    this.imageUrl = imageUrl;
  }
}
