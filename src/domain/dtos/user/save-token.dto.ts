import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  token: string;
  expire: Date;
  used: boolean;
  tokenTypeId: number;
}

export class SaveTokenDto {
  used: Constructor['used'];
  token: Constructor['token'];
  expire: Constructor['expire'];
  tokenTypeId: Constructor['tokenTypeId'];

  private constructor({ used, token, expire, tokenTypeId }: Constructor) {
    this.used = used;
    this.token = token;
    this.expire = expire;
    this.tokenTypeId = tokenTypeId;
  }

  static create(object: Record<string, unknown>): [string?, SaveTokenDto?] {
    const [error, response] = Validator.validateObject<SaveTokenDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { used, token, expire, tokenTypeId } = response!;

    return [
      undefined,
      new SaveTokenDto({
        used,
        token,
        expire,
        tokenTypeId,
      }),
    ];
  }

  static getSchema(): Record<string, unknown> {
    return {
      expire: GENERATOR.date().required(),
      token: GENERATOR.string().required(),
      used: GENERATOR.boolean().required().default(false),
      tokenTypeId: GENERATOR.number().positive().required(),
    };
  }
}
