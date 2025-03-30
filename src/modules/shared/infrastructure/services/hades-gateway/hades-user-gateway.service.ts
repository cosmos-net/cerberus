import { Injectable } from '@nestjs/common';

import { EXTERNAL_COMMANDS } from '@common/infrastructure/controllers/external-commands';
import { IHadesUserCreateRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user-create.request';
import { IHadesUserCreateResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user-create.response';
import { IHadesUserGatewayContract } from '@shared/domain/contracts/hades-user-gateway.contract';
import { HadesGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-gateway.service';

@Injectable()
export class HadesUserGatewayService
  extends HadesGatewayService
  implements IHadesUserGatewayContract
{
  constructor() {
    super();
  }

  async WarpOnboard(request: IHadesUserCreateRequest): Promise<IHadesUserCreateResponse> {
    const response = await this.sendMessage<IHadesUserCreateRequest, IHadesUserCreateResponse>(
      EXTERNAL_COMMANDS.HADES.USER.CREATE,
      request,
    );

    return response;
  }
}
