import { IsNumber, IsString, MaxLength } from 'class-validator';
import { IsNotBlank } from '../../custom-validators/isNotBlank.validator';

export class PlateCreationDto {
  @IsNotBlank()
  @IsString()
  @MaxLength(20, { message: 'name must be at most 20 characters long.' })
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsNumber()
  restaurantId: number;
}
