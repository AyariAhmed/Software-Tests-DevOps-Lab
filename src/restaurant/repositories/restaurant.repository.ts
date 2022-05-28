import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Owner } from 'src/auth/entities/owner.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  async findAll(): Promise<Restaurant[]> {
    return Restaurant.find();
  }

  async findOneById(id: number): Promise<Restaurant> {
    return Restaurant.findOne(id);
  }

  async add(restaurantName: string, url: string, owner: Owner): Promise<null> {
    let restaurant: Restaurant;

    try {
      restaurant = new Restaurant(restaurantName, 0, owner, owner.address, url);
      await restaurant.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }

    return;
  }
}
