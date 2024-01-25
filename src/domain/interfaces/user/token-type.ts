import { Token } from './token';

export interface TokenType {
  id: number;
  code: string;
  name: string;
  tokens?: Token[];
}
