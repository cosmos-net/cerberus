import { Account } from '@common/domain/models/entities/account.entity';
import { Policy } from '@common/domain/models/entities/policy.entity';
import { Session } from '@common/domain/models/entities/session.entity';

export class WarpEngageService {
  private readonly polices: { invalid: Policy[]; valid: Policy[] } = {
    invalid: [],
    valid: [],
  };

  get invalidPolicies(): Policy[] {
    return this.polices.invalid;
  }

  get validPolicies(): Policy[] {
    return this.polices.valid;
  }

  public ensureThatAccountIsValid(account: Account): void {
    if (!account) {
      throw new Error('Account is required');
    }

    if (!account.isAccountActive()) {
      throw new Error('Account is inactive');
    }
  }

  public ensureThatSessionsIsValid(sessions: Session[]): void {
    if (!sessions) {
      throw new Error('Session is required');
    }

    if (sessions.length === 0) {
      throw new Error('Session is empty');
    }

    const sessionsActive = sessions.filter((session) => session.isActive());

    if (sessionsActive.length > 0) {
      throw new Error('The account cannot be used because it has no active sessions');
    }
  }

  public ensureThatPoliciesAreValid(policies: Policy[]): void {
    if (!policies) {
      throw new Error('Policies are required');
    }

    if (policies.length === 0) {
      throw new Error('Policies are empty');
    }

    const policiesActive = policies.filter((policy) => policy.isActive());
    const policiesInactive = policies.filter((policy) => !policy.isActive());

    if (policiesActive.length === 0) {
      throw new Error('The account cannot be used because it has no active policies');
    }

    this.polices.valid = policiesActive;
    this.polices.invalid = policiesInactive;
  }
}
