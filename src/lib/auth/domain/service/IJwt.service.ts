export interface IJwtService {
  signToken: (payload: Record<string, any>) => string;
  verifyToken: (token: string) => Record<string, any>;
}
