import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PsychologistDto {
  @IsNotEmpty()
  @IsString()
  professional_license: string;

  @IsNotEmpty()
  @IsString()
  specialty: string;

  @IsNotEmpty()
  userId: number;
}
