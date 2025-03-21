import { IAccount } from '@shared/domain/anti-corruption-layer/hades-user-schemas/hades-user.common';
import { IProfile } from '@shared/domain/anti-corruption-layer/hades-user-schemas/hades-user.common';

export interface IHadesUserCreateRequest {
  accounts: IAccount[];
  profile: IProfile;
}
