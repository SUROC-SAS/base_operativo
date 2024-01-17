export interface PersonType {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export enum PersonTypeCodes {
  PERSONA_JURIDICA = 'PJ',
  PERSONA_NATURAL = 'PN',
}