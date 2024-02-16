export class ContactInformationEntity {
  id: number;
  mobile: number;
  phoneOne?: number;
  phoneTwo?: number;

  constructor(id: number, mobile: number, phoneOne?: number, phoneTwo?: number) {
    this.id = id;
    this.mobile = mobile;
    this.phoneOne = phoneOne;
    this.phoneTwo = phoneTwo;
  }
}
