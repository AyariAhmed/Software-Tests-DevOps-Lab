import { Order } from 'src/ordering/entities/order.entity';
import { RestaurantRate } from 'src/rating/entities/restaurantRate.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../auth/entities/address.entity';
import { Owner } from '../../auth/entities/owner.entity';
import { Plate } from './plate.entity';

@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rate: number;

  @OneToOne(() => Address, (address) => address.owner, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => Owner, (owner) => owner.restaurant, { eager: true })
  @JoinColumn()
  owner: Owner;

  @Column()
  imageUrl: string;

  @OneToMany(() => Plate, (plate) => plate.restaurant)
  plates: Plate[];

  @OneToMany(
    () => RestaurantRate,
    (restaurantRate) => restaurantRate.restaurant,
  )
  ratings: RestaurantRate[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  constructor(
    name: string,
    rate: number,
    owner: Owner,
    address: Address,
    imageUrl: string,
  ) {
    super();
    this.address = address;
    this.name = name;
    this.rate = rate;
    this.owner = owner;
    this.imageUrl = imageUrl;
  }
}
