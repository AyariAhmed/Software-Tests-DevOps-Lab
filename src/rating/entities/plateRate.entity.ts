import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plate } from 'src/restaurant/entities/plate.entity';
import { Client } from 'src/auth/entities/client.entity';

@Entity()
export class PlateRate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => Plate, (plate) => plate.ratings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  plate: Plate;

  @ManyToOne(() => Client, (client) => client.platesRatings, { eager: true })
  client: Client;

  constructor(value: number, plate: Plate, client: Client) {
    super();

    this.value = value;
    this.plate = plate;
    this.client = client;
  }
}
