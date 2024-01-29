import { Socket } from 'socket.io';
import { User } from '#/domain/interfaces';

export type DecodedToken = {
  email: string;
  iat: number;
  exp: number;
  uid: string;
};

export type appSocket = Socket & {
  user: User;
  encoded_token: string;
  decoded_token: DecodedToken;
};
