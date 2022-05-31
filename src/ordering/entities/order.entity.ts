import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Client } from '../../auth/entities/client.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderLine } from './orderLine.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Type(() => OrderLine)
  @ValidateNested({ each: true })
  @OneToMany(() => OrderLine, (orderLine) => orderLine.order, { eager: true })
  orderLines: OrderLine[];

  @ManyToOne(() => Client, (client) => client.orders, { eager: true })
  client: Client;

  @IsNotEmpty()
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    eager: true,
  })
  restaurant: Restaurant;

  @IsString()
  @Column()
  description: string;

  @Column()
  approved: boolean;

  @Column()
  ready: boolean;

  constructor(
    orderlines: OrderLine[],
    client: Client,
    description: string,
    approved: boolean,
    ready: boolean,
  ) {
    super();

    this.orderLines = orderlines;
    this.description = description;
    this.client = client;
    this.approved = approved;
    this.ready = ready;
  }
}
