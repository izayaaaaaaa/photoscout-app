import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarkerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}
