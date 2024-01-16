import { UserMapperModel } from "#/infrastructure/mappers";
import { PersonalInformationMapperModel } from "#/infrastructure/mappers/user/personal-information.mapper";

export interface User extends UserMapperModel {
  personalInformation?: PersonalInformationMapperModel;
};