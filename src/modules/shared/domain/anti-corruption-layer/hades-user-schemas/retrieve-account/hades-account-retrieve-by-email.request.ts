export interface IHadesAccountRetrieveByEmailRequest {
  email: string;

  withArchived?: boolean;

  failIfArchived?: boolean;

  includeSessions?: boolean;
}
