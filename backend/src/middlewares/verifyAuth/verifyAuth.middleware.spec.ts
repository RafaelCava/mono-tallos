import { VerifyAuthMiddleware } from './verifyAuth.middleware';

describe('VerifyAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyAuthMiddleware()).toBeDefined();
  });
});
