import { IsNotEmpty, IsNumber } from 'class-validator';
import { Plate } from 'src/restaurant/entities/plate.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderLine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderLines)
  order: Order;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  quantity: number;

  @IsNotEmpty()
  @ManyToOne(() => Plate, (plate) => plate.orderLines, { eager: true })
  plate: Plate;
}
