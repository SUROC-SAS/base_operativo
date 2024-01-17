import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  address: string;
  countryId?: number;
  stateName?: string;
  postalCode?: number;
  municipalityId?: number;
}

export class CreateAddressDto {
  address: Constructor['address'];
  countryId: Constructor['countryId'];
  stateName: Constructor['stateName'];
  postalCode: Constructor['postalCode'];
  municipalityId: Constructor['municipalityId'];

  private constructor({
    address,
    countryId,
    stateName,
    postalCode,
    municipalityId,
  }: Constructor) {
    this.address = address;
    this.postalCode = postalCode;
    this.countryId = countryId;
    this.municipalityId = municipalityId;
    this.stateName = stateName;
  }

  static async create(object: Record<string, unknown>): Promise<[string?, CreateAddressDto?]> {
    const [error, response] = Validator.validateObject<CreateAddressDto>(this.getSchema(), object);

    if (error) {
      return [error];
    }

    const {
      address,
      countryId,
      stateName,
      postalCode,
      municipalityId,
    } = response!;

    return [undefined, new CreateAddressDto({
      address,
      countryId,
      stateName,
      postalCode,
      municipalityId,
    })];
  }

  static getSchema = (): Record<string, unknown> => ({
    stateId: GENERATOR.number().nullable().default(null),
    address: GENERATOR.string().trim().nullable().default(null),
    stateName: GENERATOR.string().trim().nullable().default(null),
    countryId: GENERATOR.string().trim().nullable().default(null),
    postalCode: GENERATOR.string().trim().nullable().default(null),
    municipalityId: GENERATOR.string().trim().nullable().default(null),
  });
}