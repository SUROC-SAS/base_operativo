import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  address: string;
  countryId: number;
  stateId?: number;
  stateName?: string;
  postalCode: string;
  municipalityId?: number;
}

export class SaveAddressDto {
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

  static create(object: Record<string, unknown>): [string?, SaveAddressDto?] {
    const [error, response] = Validator.validateObject<SaveAddressDto>(this.getSchema(), object);
    if (error) return [error];

    const { address, stateId, countryId, stateName, postalCode, municipalityId } = response!;

    return [
      undefined,
      new SaveAddressDto({
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
    stateId: GENERATOR.number().nullable().default(null),
    address: GENERATOR.string().trim().nullable().default(null),
    stateName: GENERATOR.string().trim().nullable().default(null),
    countryId: GENERATOR.string().trim().nullable().default(null),
    postalCode: GENERATOR.string().trim().nullable().default(null),
    municipalityId: GENERATOR.string().trim().nullable().default(null),
  });

  validateForeign(): string | null {
    const error: string[] = [];
    if (!this.address) error.push('Missing address');
    if (!this.stateName) error.push('Missing stateName');
    if (!this.countryId) error.push('Missing countryId');

    if (error.length) {
      const message = new Intl.ListFormat('en').format(error);
      return message.toString();
    }

    return null;
  }

  validateNational(): string | null {
    const error: string[] = [];
    if (!this.address) error.push('Missing address');
    if (!this.postalCode) error.push('Missing postalCode');
    if (!this.stateName) error.push('Missing stateName');
    if (!this.municipalityId) error.push('Missing municipalityId');
    if (!this.stateId) error.push('Missing stateId');
    if (!this.countryId) error.push('Missing countryId');

    if (error.length) {
      const message = new Intl.ListFormat('en').format(error);
      return message.toString();
    }

    return null;
  }
}
