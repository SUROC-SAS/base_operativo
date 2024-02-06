export class TokenEntity {
  id: number;
  used: boolean;
  token: string;
  expire: Date;
  userId: number;
  tokenTypeId: number;

  constructor(
    id: number,
    used: boolean,
    token: string,
    expire: Date,
    userId: number,
    tokenTypeId: number
  ) {
    this.id = id;
    this.used = used;
    this.token = token;
    this.userId = userId;
    this.expire = expire;
    this.tokenTypeId = tokenTypeId;
  }
}