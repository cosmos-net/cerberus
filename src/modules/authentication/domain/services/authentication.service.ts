import { User } from '@authentication/domain/models/user.entity';
import { InvalidCredentialsException } from '@authentication/domain/exceptions/invalid-credentials.exception';
import { UserLockedException } from '@authentication/domain/exceptions/user-locked.exception';
import { UserNotFoundException } from '@authentication/domain/exceptions/user-not-found.exception';
import { UserRepository } from '@authentication/domain/repositories/user.repository';
import { UserEmail } from '@authentication/domain/value-objects/user-email.vo';
import { UserStatusEnum } from '@authentication/domain/value-objects/user-status.vo';

export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  public async authenticate(email: UserEmail, plainPassword: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundException(email.toString());
    }

    if (user.status.isLocked()) {
      throw new UserLockedException();
    }

    if (!user.status.isActive()) {
      throw new InvalidCredentialsException('User account is not active');
    }

    const isPasswordValid = user.validatePassword(plainPassword);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    user.recordLogin();
    await this.userRepository.update(user);

    return user;
  }
}
