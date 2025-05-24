import { GetDocumentsUseCase } from './GetDocuments.useCase';
import { NotFoundError } from '../../../common/domain/errors/NotFoundErrors';
import { IUserService } from '../../domain/service/IUser.service';
import { IDocumentBase } from '../../domain/interfaces/IDocument';

describe('GetDocumentsUseCase', () => {
  let useCase: GetDocumentsUseCase;
  let userServiceMock: jest.Mocked<IUserService>;

  beforeEach(() => {
    userServiceMock = {
      getDocuments: jest.fn(),
    } as unknown as jest.Mocked<IUserService>;

    useCase = new GetDocumentsUseCase(userServiceMock);
  });

  it('debería retornar documentos si existen', async () => {
    const fakeDocuments: IDocumentBase[] = [
      { id: 1, name: 'Documento 1' },
      { id: 2, name: 'Documento 2' },
    ];
    userServiceMock.getDocuments.mockResolvedValue(fakeDocuments);

    const result = await useCase.run();

    expect(result).toEqual(fakeDocuments);
    expect(userServiceMock.getDocuments).toHaveBeenCalledTimes(1);
  });

  it('debería lanzar NotFoundError si no hay documentos', async () => {
    userServiceMock.getDocuments.mockResolvedValue(null);

    await expect(useCase.run()).rejects.toThrow(NotFoundError);
    expect(userServiceMock.getDocuments).toHaveBeenCalledTimes(1);
  });
});
