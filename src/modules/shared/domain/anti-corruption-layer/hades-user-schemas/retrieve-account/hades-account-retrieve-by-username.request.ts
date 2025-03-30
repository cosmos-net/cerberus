export interface IHadesAccountRetrieveByUsernameRequest {
  username: string;

  withArchived?: boolean;

  failIfArchived?: boolean;

  includeSessions?: boolean;
}
