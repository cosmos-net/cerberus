import { IHadesUserCreateRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user-create.request';
import { IHadesUserCreateResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user.response';

export interface IHadesGatewayContract {
  UserWarpOnboard(request: IHadesUserCreateRequest): Promise<IHadesUserCreateResponse>;
}
