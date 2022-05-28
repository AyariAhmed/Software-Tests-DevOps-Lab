import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RatingModule } from './rating/rating.module';
import { OrderingModule } from './ordering/ordering.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    RestaurantModule,
    RatingModule,
    OrderingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
