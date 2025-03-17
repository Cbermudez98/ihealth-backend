export interface IHashProvider {
  encrypt: (str: string) => string;
  compare: (str: string, hashed: string) => boolean;
}
