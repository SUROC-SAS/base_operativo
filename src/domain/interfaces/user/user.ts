import { Address } from './address';
import { ContactInformation } from './contactInformation';
import { PersonalInformation } from './personalInformation';
import { SaveAddressDto, SaveContactInformationDto, SavePersonalInformationDto, SaveUserDto, UpdateUserDto } from '#/domain/dtos';

export interface User {
  id: number;
  uid: string;
  email: string;
  address?: Address;
  contactInformation?: ContactInformation;
  personalInformation?: PersonalInformation;
}

export interface SaveUserDtos {
  saveUserDto: SaveUserDto;
  saveAddressDto: SaveAddressDto;
  saveContactInformationDto: SaveContactInformationDto;
  savePersonalInformationDto: SavePersonalInformationDto;
}

export interface UpdateUserDtos extends Omit<SaveUserDtos, 'saveUserDto'> {
  saveUserDto: UpdateUserDto;
}

