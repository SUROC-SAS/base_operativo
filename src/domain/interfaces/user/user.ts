import { ContactInformation } from "./contactInformation";
import { PersonalInformation } from "./personalInformation";

export interface User {
  id: number;
  email: string;
  contactInformation?: ContactInformation;
  personalInformation?: PersonalInformation;
};