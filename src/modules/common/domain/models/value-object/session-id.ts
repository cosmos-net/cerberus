export class SessionId {
  constructor(private readonly value: string) {
    if (!value) throw new Error('Session ID cannot be empty');
  }

  getValue(): string {
    return this.value;
  }
}
