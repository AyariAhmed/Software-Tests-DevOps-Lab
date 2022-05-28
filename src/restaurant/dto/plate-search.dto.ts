import { IsNumber, IsString } from 'class-validator';

export class PlateSearchDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  minPrice: number;

  @IsNumber()
  maxPrice: number;
}
