import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { IDocumentUser } from '../../domain/interfaces/IDocument';

export class DocumentDto implements IDocumentUser {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
