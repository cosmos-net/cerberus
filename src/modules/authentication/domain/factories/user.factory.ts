import { v4 as uuidv4 } from 'uuid';

import { User, UserProps } from '@authentication/domain/models/user.entity';
import { UserCreatedAt } from '@authentication/domain/value-objects/user-created-at.vo';
import { UserEmail } from '@authentication/domain/value-objects/user-email.vo';
import { UserId } from '@authentication/domain/value-objects/user-id.vo';
import { UserName } from '@authentication/domain/value-objects/user-name.vo';
import { UserPassword } from '@authentication/domain/value-objects/user-password.vo';
import { UserRole, UserRoleEnum } from '@authentication/domain/value-objects/user-role.vo';
import { UserStatus, UserStatusEnum } from '@authentication/domain/value-objects/user-status.vo';
import { UserUpdatedAt } from '@authentication/domain/value-objects/user-updated-at.vo';

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
  role?: UserRoleEnum;
}

export class UserFactory {
  public static create(params: CreateUserParams): User {
    const now = new Date();

    const userProps: UserProps = {
      id: UserId.create(uuidv4()),
      email: UserEmail.create(params.email),
      password: UserPassword.create(params.password),
      name: UserName.create(params.name),
      status: UserStatus.ACTIVE,
      role: params.role ? UserRole.create(params.role) : UserRole.USER,
      createdAt: UserCreatedAt.create(now),
      updatedAt: UserUpdatedAt.create(now),
    };

    return User.create(userProps);
  }

  public static createPending(params: CreateUserParams): User {
    const now = new Date();

    const userProps: UserProps = {
      id: UserId.create(uuidv4()),
      email: UserEmail.create(params.email),
      password: UserPassword.create(params.password),
      name: UserName.create(params.name),
      status: UserStatus.PENDING,
      role: params.role ? UserRole.create(params.role) : UserRole.USER,
      createdAt: UserCreatedAt.create(now),
      updatedAt: UserUpdatedAt.create(now),
    };

    return User.create(userProps);
  }
}
