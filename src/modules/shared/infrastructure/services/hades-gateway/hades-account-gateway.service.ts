import { Injectable } from '@nestjs/common';

import { Account } from '@common/domain/models/entities/account.entity';
import { Session } from '@common/domain/models/entities/session.entity';
import { SessionCookie } from '@common/domain/models/value-object/session-cookie.vo';
import { SessionId } from '@common/domain/models/value-object/session-id';
import { EXTERNAL_COMMANDS } from '@common/infrastructure/controllers/external-commands';
import {
  IHadesAccountRetrieveByAnyResponse,
  IHadesAccountRetrieveFormatResponse,
} from '@shared/domain/anti-corruption-layer/hades-user-schemas/retrieve-account/hades-account-retrieve-by-any.response';
import { IHadesAccountRetrieveByEmailRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/retrieve-account/hades-account-retrieve-by-email.request';
import { IHadesAccountRetrieveByUsernameRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/retrieve-account/hades-account-retrieve-by-username.request';
import { IHadesAccountGatewayContract } from '@shared/domain/contracts/hades-account-gateway.contract';
import { HadesGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-gateway.service';

@Injectable()
export class HadesAccountGatewayService
  extends HadesGatewayService
  implements IHadesAccountGatewayContract
{
  constructor() {
    super();
  }

  async retrieveByEmail(
    request: IHadesAccountRetrieveByEmailRequest,
  ): Promise<IHadesAccountRetrieveFormatResponse> {
    const response = await this.sendMessage<
      IHadesAccountRetrieveByEmailRequest,
      IHadesAccountRetrieveByAnyResponse
    >(EXTERNAL_COMMANDS.HADES.USER.ACCOUNT.SEARCH_ACCOUNT_BY_EMAIL, {
      email: request.email,
      withArchived: request.withArchived,
      includeSessions: request.includeSessions,
    });

    const account = new Account({
      id: response.uuid,
      email: response.email,
      isActive: !response.archivedAt,
    });

    const sessions: Session[] = response.sessions.map((session) => {
      return new Session({
        sessionId: new SessionId(session.sessionId),
        sessionCookie: new SessionCookie(session.sessionType, true),
        createdAt: session.createdAt,
        expiresAt: session.expiresInAt ? session.expiresInAt : null,
      });
    });

    return {
      account,
      sessions,
    };
  }

  async retrieveByUsername(
    request: IHadesAccountRetrieveByUsernameRequest,
  ): Promise<IHadesAccountRetrieveFormatResponse> {
    const response = await this.sendMessage<
      IHadesAccountRetrieveByUsernameRequest,
      IHadesAccountRetrieveByAnyResponse
    >(EXTERNAL_COMMANDS.HADES.USER.ACCOUNT.SEARCH_ACCOUNT_BY_USERNAME, {
      username: request.username,
      withArchived: request.withArchived,
      includeSessions: request.includeSessions,
    });

    const account = new Account({
      id: response.uuid,
      email: response.email,
      isActive: !response.archivedAt,
    });

    const sessions: Session[] = response.sessions.map((session) => {
      return new Session({
        sessionId: new SessionId(session.sessionId),
        sessionCookie: new SessionCookie(session.sessionType, true),
        createdAt: session.createdAt,
        expiresAt: session.expiresInAt ? session.expiresInAt : null,
      });
    });

    return {
      account,
      sessions,
    };
  }
}
