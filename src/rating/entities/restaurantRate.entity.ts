import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../auth/entities/client.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class RestaurantRate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.ratings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @ManyToOne(() => Client, (client) => client.restaurantsRatings, {
    eager: true,
  })
  client: Client;

  constructor(value: number, restaurant: Restaurant, client: Client) {
    super();

    this.value = value;
    this.restaurant = restaurant;
    this.client = client;
  }
}
