import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/auth/entities/owner.entity';
import { Repository } from 'typeorm';
import { PlateCreationDto } from './dto/plate-creation.dto';
import { PlateSearchDto } from './dto/plate-search.dto';
import { Plate } from './entities/plate.entity';
import { Restaurant } from './entities/restaurant.entity';
import { PlateRepository } from './repositories/plate.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private customRestaurantRepository: RestaurantRepository,
    @InjectRepository(PlateRepository)
    private customPlateRepository: PlateRepository,
    @InjectRepository(Plate) private plateRepository: Repository<Plate>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async addRestaurant(
    restaurantName: string,
    imageUrl: string,
    owner: Owner,
  ): Promise<null> {
    const restaurant = new Restaurant(
      restaurantName,
      0,
      owner,
      owner.address,
      imageUrl,
    );

    this.restaurantRepository.save(restaurant);
    owner.restaurant = restaurant;
    Owner.save(owner);

    return;
  }

  async findAllRestaurants(): Promise<Restaurant[]> {
    return this.customRestaurantRepository.findAll();
  }

  async findRestaurantById(id: number): Promise<Restaurant> {
    return Restaurant.findOne(id);
  }

  async findPlateById(id: number): Promise<Plate> {
    return Plate.findOne(id);
  }

  async findPlates(plateDto: PlateSearchDto): Promise<Plate[]> {
    const allPlates = await Plate.find();
    const validPlates: Plate[] = [];

    allPlates.forEach((plate) => {
      if (
        plate.name.includes(plateDto.name) ||
        plate.description.includes(plateDto.description) ||
        (plate.price >= plateDto.minPrice && plate.price <= plateDto.maxPrice)
      )
        validPlates.push(plate);
    });

    return validPlates;
  }

  async addPlate(
    plateCreationDto: PlateCreationDto,
    restaurant: Restaurant,
  ): Promise<null> {
    const { name, description, price, imageUrl } = plateCreationDto;

    let plate: Plate;

    try {
      plate = new Plate(name, description, 0, price, restaurant, imageUrl);
      await plate.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }

    return;
  }

  async findTopRatedPlates(limit: number): Promise<Plate[]> {
    return this.plateRepository.find({
      order: {
        rate: 'DESC',
      },
      take: limit,
    });
  }

  async findTopRatedRestaurants(limit: number): Promise<Restaurant[]> {
    return this.restaurantRepository.find({
      order: {
        rate: 'DESC',
      },
      take: limit,
    });
  }

  async getRestaurantPlates(restaurantId): Promise<Plate[]> {
    const restaurant = await this.restaurantRepository.findOne(restaurantId);

    return this.plateRepository.find({
      restaurant: restaurant,
    });
  }

  async removeRestaurant(id: number) {
    this.restaurantRepository.delete(id);
  }

  async removePlate(id: number) {
    this.plateRepository.delete(id);
  }
}
