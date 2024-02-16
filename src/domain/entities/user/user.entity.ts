import { TokenEntity } from './token.entity';
import { CustomError } from '#/domain/errors/custom.error';
import { AddressEntity } from './address.entity';
import { ContactInformationEntity } from './contact-information.entity';
import { PersonalInformationEntity } from './personal-information.entity';
import { AssignRoleEntity } from './assign-role.entity';

export class UserEntity {
  id: number;
  uid: string;
  email: string;
  token?: TokenEntity[];
  address?: AddressEntity;
  assignRoles?: AssignRoleEntity[];
  contactInformation?: ContactInformationEntity;
  personalInformation?: PersonalInformationEntity;

  constructor(id: number, uid: string, email: string) {
    this.id = id;
    this.uid = uid;
    this.email = email;
  }

  getFullName(): string {
    if (!this.personalInformation) {
      throw CustomError.internal('User does not have personal information');
    }

    return this.personalInformation.getFullName();
  }
}
