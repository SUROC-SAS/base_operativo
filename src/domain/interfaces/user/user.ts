import { Address } from './address';
import { ContactInformation } from './contactInformation';
import { PersonalInformation } from './personalInformation';
import { SaveAddressDto, SaveContactInformationDto, SavePersonalInformationDto, SaveUserDto } from '#/domain/dtos';

export interface User {
  id: number;
  uid: string;
  email: string;
  address?: Address;
  contactInformation?: ContactInformation;
  personalInformation?: PersonalInformation;
}

export interface SaveUserDtos {
  createUserDto: SaveUserDto;
  createAddressDto: SaveAddressDto;
  createContactInformationDto: SaveContactInformationDto;
  createPersonalInformationDto: SavePersonalInformationDto;
}
