import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  mobile: number;
  phoneOne?: number;
  phoneTwo?: number;
}

export class CreateContactInformationDto {
  mobile: Constructor['mobile'];
  phoneOne: Constructor['phoneOne'];
  phoneTwo: Constructor['phoneTwo'];


  private constructor({
    mobile,
    phoneOne,
    phoneTwo,
  }: Constructor) {
    this.mobile = mobile;
    this.phoneOne = phoneOne;
    this.phoneTwo = phoneTwo;
  }

  static async create(object: Record<string, unknown>): Promise<[string?, CreateContactInformationDto?]> {
    const [error, response] = Validator.validateObject<CreateContactInformationDto>(this.getSchema(), object);

    if (error) {
      return [error];
    }

    const {
      mobile,
      phoneOne,
      phoneTwo,
    } = response!;

    return [undefined, new CreateContactInformationDto({
      mobile,
      phoneOne,
      phoneTwo,
    })];
  }

  static getSchema = (): Record<string, unknown> => ({
    mobile: GENERATOR.number().required(),
    phoneOne: GENERATOR.number().nullable().default(null),
    phoneTwo: GENERATOR.number().nullable().default(null),
  });
}