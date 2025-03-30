import { IHadesAccountRetrieveFormatResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/retrieve-account/hades-account-retrieve-by-any.response';
import { IHadesAccountRetrieveByEmailRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/retrieve-account/hades-account-retrieve-by-email.request';
import { IHadesAccountRetrieveByUsernameRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/retrieve-account/hades-account-retrieve-by-username.request';

export interface IHadesAccountGatewayContract {
  retrieveByEmail(
    request: IHadesAccountRetrieveByEmailRequest,
  ): Promise<IHadesAccountRetrieveFormatResponse>;
  retrieveByUsername(
    request: IHadesAccountRetrieveByUsernameRequest,
  ): Promise<IHadesAccountRetrieveFormatResponse>;
}
