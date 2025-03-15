import { User } from '@authentication/domain/models/user.entity';

import { AuthenticationEvent } from '@authentication/domain/events/authentication-event';

export class UserAuthenticatedEvent extends AuthenticationEvent {
  constructor(readonly user: User) {
    super(UserAuthenticatedEvent.name);
  }
}
