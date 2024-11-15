import { IsNotEmpty, IsString } from 'class-validator';
import { IMenuDto } from '../../domain/interfaces/IMenu';

export class MenuDto implements IMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  route: string;
}
