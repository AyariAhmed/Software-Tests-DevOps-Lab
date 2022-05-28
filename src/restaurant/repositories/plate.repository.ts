import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Plate } from '../entities/plate.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@EntityRepository(Restaurant)
export class PlateRepository extends Repository<Plate> {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {
    super();
  }

  async findAll(): Promise<Plate[]> {
    return Plate.find();
  }

  async add(plateCreationDto, restaurant): Promise<null> {
    const { name, description, price, url } = plateCreationDto;

    let plate: Plate;

    try {
      plate = new Plate(name, description, 0, price, restaurant, url);
      await plate.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }

    return;
  }
}
