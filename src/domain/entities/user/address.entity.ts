import { CreateAddressDto } from '#/domain/dtos';

type Constructor = {
  id: number;
  address: string;
  stateId: number;
  countryId: number;
  postalCode: string;
  stateName?: string;
  municipalityId?: number;
};

export class AddressEntity {
  id: number;
  address: string;
  stateId?: number | null;
  countryId: number;
  stateName?: string | null;
  postalCode: string;
  municipalityId?: number | null;

  constructor({ id, address, stateName, stateId, countryId, postalCode, municipalityId }: Constructor) {
    this.id = id;
    this.address = address;
    this.stateId = stateId;
    this.stateName = stateName;
    this.countryId = countryId;
    this.postalCode = postalCode;
    this.municipalityId = municipalityId;
  }

  static validateDto(addressDto: CreateAddressDto, isNational: boolean): string | null {
    const error: string[] = [];
    if (isNational) {
      if (!addressDto.address) error.push('Missing address');
      if (!addressDto.postalCode) error.push('Missing postalCode');
      if (!addressDto.stateId) error.push('Missing stateId');
      if (!addressDto.countryId) error.push('Missing countryId');
      if (!addressDto.municipalityId) error.push('Missing municipalityId');

      if (error.length) {
        const message = new Intl.ListFormat('en').format(error);
        return message.toString();
      }

      addressDto.stateName = null;
      return null;
    }

    if (!addressDto.address) error.push('Missing address');
    if (!addressDto.postalCode) error.push('Missing postalCode');
    if (!addressDto.stateName) error.push('Missing stateName');
    if (!addressDto.countryId) error.push('Missing countryId');

    addressDto.stateId = null;
    addressDto.municipalityId = null;
    if (error.length) {
      const message = new Intl.ListFormat('en').format(error);
      return message.toString();
    }

    return null;
  }
}
