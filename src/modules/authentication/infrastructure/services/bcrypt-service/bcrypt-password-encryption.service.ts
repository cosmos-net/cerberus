import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IPasswordEncryptionService } from '@authentication/domain/contracts/password-encryption-service.contract';

@Injectable()
export class BcryptPasswordEncryptionService implements IPasswordEncryptionService {
  private readonly SALT_ROUNDS = 10;

  async encrypt(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(plainPassword, salt);
  }

  async compare(plainPassword: string, encryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, encryptedPassword);
  }
}
