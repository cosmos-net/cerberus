import { Entity } from '@common/domain/entities/entity';

export interface IAccountEntityRoot {
  id: string;
  email: string;
  isActive: boolean;
}

export class Account extends Entity<IAccountEntityRoot> {
  constructor(entityRoot: IAccountEntityRoot) {
    super(entityRoot);
  }

  isAccountActive(): boolean {
    return this.entityRoot.isActive;
  }

  getId(): string {
    return this.entityRoot.id;
  }

  getEmail(): string {
    return this.entityRoot.email;
  }
}
