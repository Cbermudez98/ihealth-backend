import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
