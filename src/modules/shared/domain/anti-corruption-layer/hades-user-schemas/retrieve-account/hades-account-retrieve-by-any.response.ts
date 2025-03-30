import { Account } from '@common/domain/models/entities/account.entity';
import { Session } from '@common/domain/models/entities/session.entity';

export interface IHadesAccountRetrieveFormatResponse {
  account: Account;
  sessions: Session[];
}

export interface IHadesSessionResponse {
  id: number;
  uuid: string;
  sessionId: string;
  sessionType: string;
  sessionDuration: number | null;
  token: string | null;
  ipAddress: string;
  refreshToken: string | null;
  userAgent: string;
  origin: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  sessionClosedType: string | null;
  loggedInAt: Date | null;
  expiresInAt: Date | null;
  status: string;
  loggedOutAt: Date | null;
  failedAttempts: number;
}

export interface IHadesAccountRetrieveByAnyResponse {
  id?: number;
  uuid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
  sessions: IHadesSessionResponse[];
}
