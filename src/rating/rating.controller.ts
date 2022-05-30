import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RatingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';
import { Plate } from '../restaurant/entities/plate.entity';

@Controller('rating')
@hasRoles(UserRole.CLIENT, UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post('ratePlate')
  ratePlate(
    @Body(ValidationPipe) ratingDto: RatingDto,
    @GetUser() client,
  ): Promise<Plate> {
    return this.ratingService.addPlateRate(ratingDto, client);
  }

  @Post('rateRestaurant')
  rateRestaurant(
    @Body(ValidationPipe) ratingDto: RatingDto,
    @GetUser() client,
  ): Promise<void> {
    return this.ratingService.addRestaurantRate(ratingDto, client);
  }
}
