import { IAccount } from 'src/modules/shared/domain/anti-corruption-layer/hades-user-schemas/hades-user.common';
import { IProfile } from 'src/modules/shared/domain/anti-corruption-layer/hades-user-schemas/hades-user.common';

export interface IHadesUserCreateRequest {
  accounts: IAccount[];
  profile: IProfile;
}
