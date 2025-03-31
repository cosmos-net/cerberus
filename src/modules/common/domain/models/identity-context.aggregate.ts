import { Account } from '@common/domain/models/entities/account.entity';
import { Policy } from '@common/domain/models/entities/policy.entity';
import { Session } from '@common/domain/models/entities/session.entity';

export class IdentityContext {
  constructor(
    private readonly account: Account,
    private readonly session: Session,
    private readonly policies: Policy[],
  ) {}

  getAccount(): Account {
    return this.account;
  }

  getSession(): Session {
    return this.session;
  }

  getPolicies(): Policy[] {
    return this.policies;
  }
}
