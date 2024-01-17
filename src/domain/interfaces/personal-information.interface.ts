import { User } from "./user.interface";
import { PersonType } from "./person-type.interface";
import { TaxLiability } from "./tax-liability.interface";
import { Identification } from "./identification.interface";

export interface PersonalInformation {
  id: number;
  firstName?: string;
  middleName?: string;
  firstSurname?: string;
  secondSurname?: string;
  businessName?: string;
  documentNumber: number;
  dv?: number;
  typeIdentification: string;
  identificationId?: number;
  taxLiabilityId: number;
  personTypeId?: number;
  userId: number;
  user?: User;
  personType?: PersonType;
  taxLiability?: TaxLiability;
  identification?: Identification;
};