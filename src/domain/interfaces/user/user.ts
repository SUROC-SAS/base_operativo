import { PersonalInformation } from "./personalInformation";

export interface User {
  id: number;
  email: string;
  personalInformation?: PersonalInformation
};