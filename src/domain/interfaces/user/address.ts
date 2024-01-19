export interface Address {
  id: number;
  address: string;
  stateId: number;
  countryId: number;
  stateName?: string;
  postalCode: string;
  municipalityId?: number;
};