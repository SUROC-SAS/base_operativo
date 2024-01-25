import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  token: string;
  expire: Date;
  used: boolean;
  userId: number;
  tokenTypeId: number;
}

export class CreateTokenDto {
  used: Constructor['used'];
  token: Constructor['token'];
  expire: Constructor['expire'];
  userId: Constructor['userId'];
  tokenTypeId: Constructor['tokenTypeId'];

  private constructor({ used, token, expire, userId, tokenTypeId }: Constructor) {
    this.used = used;
    this.token = token;
    this.userId = userId;
    this.expire = expire;
    this.tokenTypeId = tokenTypeId;
  }

  static create(object: Record<string, unknown>): [string?, CreateTokenDto?] {
    const [error, response] = Validator.validateObject<CreateTokenDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { used, token, expire, userId, tokenTypeId } = response!;

    return [
      undefined,
      new CreateTokenDto({
        used,
        token,
        expire,
        userId,
        tokenTypeId,
      }),
    ];
  }

  static getSchema(): Record<string, unknown> {
    return {
      expire: GENERATOR.date().required(),
      token: GENERATOR.string().required(),
      userId: GENERATOR.number().positive().required(),
      used: GENERATOR.boolean().required().default(false),
      tokenTypeId: GENERATOR.number().positive().required(),
    };
  }
}
