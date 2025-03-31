export class SessionCookie {
  constructor(
    private readonly value: string,
    private readonly secure: boolean,
  ) {
    if (!value) throw new Error('Session Cookie cannot be empty');
  }

  getValue(): string {
    return this.value;
  }

  isSecure(): boolean {
    return this.secure;
  }
}
