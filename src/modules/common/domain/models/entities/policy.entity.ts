import { Entity } from '@common/domain/entities/entity';

export interface IPolicyEntityRoot {
  policyId: string;
  name: string;
  archivedAt: Date | null;
}

export class Policy extends Entity<IPolicyEntityRoot> {
  constructor(entityRoot: IPolicyEntityRoot) {
    super(entityRoot);
  }

  getPolicyId(): string {
    return this.entityRoot.policyId;
  }

  getName(): string {
    return this.entityRoot.name;
  }

  getArchivedAt(): Date | null {
    return this.entityRoot.archivedAt;
  }

  isActive(): boolean {
    return this.entityRoot.archivedAt === null;
  }
}
