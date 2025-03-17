import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { NotFoundError } from './../../../lib/common/domain/errors/NotFoundErrors';

describe('HttpFilter', () => {
  const hostMock = {
    switchToHttp: jest.fn(() => ({
      getResponse: () => ({
        status: () => ({
          json: jest.fn(),
        }),
      }),
      getRequest: jest.fn(),
    })),
  };
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });

  it('should return the correct status and message when HttpException is thrown', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockRequest = {};
    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
    const exception = new NotFoundError('Test error');
    const filter = new HttpExceptionFilter();

    filter.catch(exception, mockHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return the correct status and message when DomainError is thrown', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockRequest = {};
    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
    const exception = new NotFoundError('Test error');
    const filter = new HttpExceptionFilter();

    filter.catch(exception, mockHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return the correct status and message when other error is thrown', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockRequest = {};
    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
    const exception = undefined;
    const filter = new HttpExceptionFilter();

    filter.catch(exception, mockHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
});
