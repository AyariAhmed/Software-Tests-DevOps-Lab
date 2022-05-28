import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/auth/entities/client.entity';
import { Owner } from 'src/auth/entities/owner.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Plate } from 'src/restaurant/entities/plate.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { PlateRate } from './entities/plateRate.entity';
import { RestaurantRate } from './entities/restaurantRate.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Plate,
      Client,
      Owner,
      RestaurantRate,
      PlateRate,
      Restaurant,
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService, RolesGuard, JwtAuthGuard],
})
export class RatingModule {}
