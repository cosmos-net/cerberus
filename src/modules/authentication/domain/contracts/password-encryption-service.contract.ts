export interface IPasswordEncryptionService {
  encrypt(plainPassword: string): Promise<string>;

  compare(plainPassword: string, encryptedPassword: string): Promise<boolean>;
}
