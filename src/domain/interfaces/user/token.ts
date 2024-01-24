import { User } from "./user";
import { TokenType } from "./token-type";

export interface Token {
  id: number;
  token: string;
  expire: Date;
  used: boolean;
  userId: number;
  tokenTypeId: number;
  user?: User;
  tokenType?: TokenType;
};

export interface CreateToken {
  token: string;
  used: boolean;
  expire: Date;
  userId: number;
  tokenTypeId: number;
};