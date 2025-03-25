export interface IAddress {
  street: string;
  extNumber: string;
  intNumber?: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

export interface IProfile {
  names: string[];
  lastName: string;
  secondLastName?: string;
  phoneNumber: string;
  gender: string;
  address: IAddress;
}

export interface IAccount {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export class WarpAboardCommand {
  public readonly accounts: IAccount[];
  public readonly profile: IProfile;

  constructor(accounts: IAccount[], profile: IProfile) {
    this.accounts = accounts;
    this.profile = profile;
  }
}
