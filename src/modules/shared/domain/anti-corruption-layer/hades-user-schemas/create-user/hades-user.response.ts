import {
  IAccount,
  IProfile,
} from 'src/modules/shared/domain/anti-corruption-layer/hades-user-schemas/hades-user.common';

interface IExtendedProfile extends IProfile {
  createdAt: Date;
}

interface IAccounts extends IAccount {
  createdAt: Date;
}

export interface IHadesUserCreateResponse {
  id: number;
  uuid: string;
  status: string;
  accounts: IAccounts[];
  profile: IExtendedProfile;
  createdAt: Date;
}
