import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Owner } from './owner.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  governorate: string;

  @Column()
  municipality: string;

  @Column()
  street: string;

  @Column()
  location: string;

  @OneToOne(() => Client, (client) => client.address)
  client: Client;

  @OneToOne(() => Owner, (owner) => owner.address)
  owner: Owner;

  @OneToOne(() => Owner, (owner) => owner.address)
  restaurant: Restaurant;

  constructor(
    governorate: string,
    municipality: string,
    street: string,
    location: string,
  ) {
    super();
    this.governorate = governorate;
    this.municipality = municipality;
    this.street = street;
    this.location = location;
  }
}
