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

  private constructor({ mobile, phoneOne, phoneTwo }: Constructor) {
    this.mobile = mobile;
    this.phoneOne = phoneOne;
    this.phoneTwo = phoneTwo;
  }

  static create(object: Record<string, unknown>): [string?, CreateContactInformationDto?] {
    const [error, response] = Validator.validateObject<CreateContactInformationDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { mobile, phoneOne, phoneTwo } = response!;

    const dto = new CreateContactInformationDto({
      mobile,
      phoneOne,
      phoneTwo,
    });

    return [undefined, dto];
  }

  static getSchema(): Record<string, unknown> {
    return {
      mobile: GENERATOR.number().required(),
      phoneOne: GENERATOR.number().optional().nullable(),
      phoneTwo: GENERATOR.number().optional().nullable(),
    };
  }
}
