import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ClientRepository } from 'src/auth/repositories/client.repository';
import { OwnerRepository } from 'src/auth/repositories/owner.repository';
import { Plate } from './entities/plate.entity';
import { Restaurant } from './entities/restaurant.entity';
import { PlateRepository } from './repositories/plate.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantRepository,
      PlateRepository,
      ClientRepository,
      OwnerRepository,
      Plate,
      Restaurant,
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RolesGuard, JwtAuthGuard],
})
export class RestaurantModule {}
