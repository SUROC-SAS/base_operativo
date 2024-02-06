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
  stateId: number;
  countryId: number;
  stateName?: string;
  postalCode: string;
  municipalityId?: number;

  constructor({
    id,
    address,
    stateId,
    countryId,
    postalCode,
    municipalityId,
  }: Constructor) {
    this.id = id;
    this.address = address;
    this.stateId = stateId;
    this.countryId = countryId;
    this.postalCode = postalCode;
    this.municipalityId = municipalityId;
  }

  static validateDto(addressDto: CreateAddressDto, isNational: boolean): string | null {
    const error: string[] = [];
    if (isNational) {
      if (!addressDto.address) error.push('Missing address');
      if (!addressDto.postalCode) error.push('Missing postalCode');
      if (!addressDto.stateName) error.push('Missing stateName');
      if (!addressDto.stateId) error.push('Missing stateId');
      if (!addressDto.countryId) error.push('Missing countryId');
      if (!addressDto.municipalityId) error.push('Missing municipalityId');

      if (error.length) {
        const message = new Intl.ListFormat('en').format(error);
        return message.toString();
      }

      addressDto.stateName = undefined;
      return null;
    }

    if (!addressDto.address) error.push('Missing address');
    if (!addressDto.stateName) error.push('Missing stateName');
    if (!addressDto.countryId) error.push('Missing countryId');

    addressDto.stateId = undefined;
    addressDto.municipalityId = undefined;
    if (error.length) {
      const message = new Intl.ListFormat('en').format(error);
      return message.toString();
    }

    return null;
  }
}