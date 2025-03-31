export class JwtPayload {
  constructor(
    private readonly accountId: string,
    private readonly policies: string[],
    private readonly sessionId: string,
  ) {}

  getAccountId(): string {
    return this.accountId;
  }

  getPolicies(): string[] {
    return this.policies;
  }

  getSessionId(): string {
    return this.sessionId;
  }
}
