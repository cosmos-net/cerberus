import { DomainEvent } from '@authentication/domain/events/domain-event';

export abstract class AuthenticationEvent extends DomainEvent {
  constructor(eventName: string) {
    super(eventName);
  }
}
