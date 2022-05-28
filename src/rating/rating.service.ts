import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/auth/entities/client.entity';
import { Plate } from 'src/restaurant/entities/plate.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RatingDto } from './dto/rating.dto';
import { PlateRate } from './entities/plateRate.entity';
import { RestaurantRate } from './entities/restaurantRate.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(PlateRate)
    private plateRatingRepository: Repository<PlateRate>,
    @InjectRepository(RestaurantRate)
    private restaurantRatingRepository: Repository<RestaurantRate>,
    @InjectRepository(Plate)
    private plateRepository: Repository<Plate>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async addPlateRate(rateDto: RatingDto, client: Client) {
    const plate = await this.plateRepository.findOne(rateDto.entityId);

    if (!plate) throw new InternalServerErrorException();
    else {
      const oldRate = await this.plateRatingRepository.findOne({
        where: { plate: plate, client: client },
      });
      const totalRating = (
        await this.plateRatingRepository.find({ where: { plate: plate } })
      ).length;

      let newRateValue: number;

      if (oldRate) {
        newRateValue = Math.ceil(
          (plate.rate * totalRating - oldRate.value + rateDto.value) /
            (totalRating + 1),
        );
        oldRate.value = rateDto.value;
        await this.plateRatingRepository.save(oldRate);
      } else {
        const rate = new PlateRate(rateDto.value, plate, client);
        newRateValue = Math.ceil(
          (plate.rate * totalRating + rate.value) / (totalRating + 1),
        );
        await this.plateRatingRepository.save(rate);
      }
      plate.rate = newRateValue;
      await this.plateRepository.save(plate);
    }
  }

  async addRestaurantRate(rateDto: RatingDto, client: Client) {
    const restaurant = await this.restaurantRepository.findOne(
      rateDto.entityId,
    );

    if (!restaurant) {
      throw new InternalServerErrorException();
    } else {
      const oldRate = await this.restaurantRatingRepository.findOne({
        where: { restaurant: restaurant, client: client },
      });
      const totalRating = (
        await this.restaurantRatingRepository.find({
          where: { restaurant: restaurant },
        })
      ).length;

      let newRateValue: number;

      if (oldRate) {
        newRateValue = Math.ceil(
          (restaurant.rate * totalRating - oldRate.value + rateDto.value) /
            totalRating,
        );
        oldRate.value = rateDto.value;
        await this.restaurantRatingRepository.save(oldRate);
      } else {
        const rate = new RestaurantRate(rateDto.value, restaurant, client);
        newRateValue = Math.ceil(
          (restaurant.rate * totalRating + rate.value) / (totalRating + 1),
        );
        await this.restaurantRatingRepository.save(rate);
      }
      restaurant.rate = newRateValue;
      await this.restaurantRepository.save(restaurant);
    }
  }
}
