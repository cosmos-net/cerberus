import { IHadesUserCreateRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user-create.request';
import { IHadesUserCreateResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user-create.response';

export interface IHadesUserGatewayContract {
  WarpOnboard(request: IHadesUserCreateRequest): Promise<IHadesUserCreateResponse>;
}
