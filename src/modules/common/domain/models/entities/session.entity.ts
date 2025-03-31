import { Entity } from '@common/domain/entities/entity';
import { SessionCookie } from '@common/domain/models/value-object/session-cookie.vo';
import { SessionId } from '@common/domain/models/value-object/session-id';

export interface ISessionEntityRoot {
  sessionId: SessionId;
  sessionCookie: SessionCookie;
  createdAt: Date;
  expiresAt: Date | null;
}

export class Session extends Entity<ISessionEntityRoot> {
  constructor(entityRoot: ISessionEntityRoot) {
    super(entityRoot);
  }

  getSessionId(): SessionId {
    return this.entityRoot.sessionId;
  }

  getSessionCookie(): SessionCookie {
    return this.entityRoot.sessionCookie;
  }

  getCreatedAt(): Date {
    return this.entityRoot.createdAt;
  }

  getExpiresAt(): Date | null {
    return this.entityRoot.expiresAt;
  }

  isActive(): boolean {
    return this.entityRoot.expiresAt !== null && this.entityRoot.expiresAt > new Date();
  }
}
