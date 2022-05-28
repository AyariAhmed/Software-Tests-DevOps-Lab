import { IsNumber, Max, Min } from 'class-validator';
export class RatingDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  value: number;

  @IsNumber()
  entityId: number;
}
