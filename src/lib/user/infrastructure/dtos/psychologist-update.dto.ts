import { IsOptional, IsString } from 'class-validator';

export class PsychologistUpdateDto {
  @IsOptional()
  @IsString()
  professional_license?: string;

  @IsOptional()
  @IsString()
  specialty?: string;
}
