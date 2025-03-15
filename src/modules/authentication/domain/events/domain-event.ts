export abstract class DomainEvent {
  readonly eventName: string;
  readonly occurredOn: Date;

  constructor(eventName: string) {
    this.eventName = eventName;
    this.occurredOn = new Date();
  }
}
