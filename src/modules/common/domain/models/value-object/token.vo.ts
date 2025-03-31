export class Token {
  constructor(private readonly token: string) {
    if (!token) throw new Error('Token is required');
    if (token.length < 10) throw new Error('Token must be at least 10 characters long');
    if (token.length > 100) throw new Error('Token must be at most 100 characters long');
    if (!/^[a-zA-Z0-9]+$/.test(token)) throw new Error('Token must be alphanumeric');
    if (!/^[a-zA-Z]/.test(token)) throw new Error('Token must start with a letter');
    if (!/[a-zA-Z0-9]$/.test(token)) throw new Error('Token must end with a letter or number');
    if (token.includes(' ')) throw new Error('Token must not contain spaces');
  }

  getToken(): string {
    return this.token;
  }
}
