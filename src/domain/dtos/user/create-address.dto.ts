import { GENERATOR, Validator } from '#/config/adapters/validator';

interface Constructor {
  address: string;
  countryId: number;
  stateId?: number;
  stateName?: string;
  postalCode: string;
  municipalityId?: number;
}

export class CreateAddressDto {
  address: Constructor['address'];
  stateId: Constructor['stateId'];
  stateName: Constructor['stateName'];
  countryId: Constructor['countryId'];
  postalCode: Constructor['postalCode'];
  municipalityId: Constructor['municipalityId'];

  private constructor({ address, stateId, countryId, stateName, postalCode, municipalityId }: Constructor) {
    this.stateId = stateId;
    this.address = address;
    this.postalCode = postalCode;
    this.countryId = countryId;
    this.municipalityId = municipalityId;
    this.stateName = stateName;
  }

  static create(object: Record<string, unknown>): [string?, CreateAddressDto?] {
    const [error, response] = Validator.validateObject<CreateAddressDto>(this.getSchema(), object);
    if (error) return [error];

    const { address, stateId, countryId, stateName, postalCode, municipalityId } = response!;

    return [
      undefined,
      new CreateAddressDto({
        address,
        stateId,
        countryId,
        stateName,
        postalCode,
        municipalityId,
      }),
    ];
  }

  static getSchema = (): Record<string, unknown> => ({
    address: GENERATOR.string().trim().required(),
    stateName: GENERATOR.string().trim().nullable(),
    postalCode: GENERATOR.string().trim().required(),
    stateId: GENERATOR.number().nullable(),
    countryId: GENERATOR.string().trim().required(),
    municipalityId: GENERATOR.string().trim().nullable(),
  });
}
