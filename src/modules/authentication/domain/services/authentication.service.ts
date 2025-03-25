// import { User } from '@authentication/domain/models/user.entity';
// import { InvalidCredentialsException } from '@authentication/domain/exceptions/invalid-credentials.exception';
// import { UserLockedException } from '@authentication/domain/exceptions/user-locked.exception';
// import { UserNotFoundException } from '@authentication/domain/exceptions/user-not-found.exception';
// import { UserRepository } from '@authentication/domain/repositories/user.repository';
// import { UserEmail } from '@authentication/domain/value-objects/user-email.vo';
// import { PasswordEncryptionService } from './password-encryption.service.interface';

// export class AuthenticationService {
//   constructor(
//     private readonly userRepository: UserRepository,
//     private readonly passwordEncryptionService: PasswordEncryptionService
//   ) {}

//   public async authenticate(email: UserEmail, plainPassword: string): Promise<User> {
//     const user = await this.userRepository.findByEmail(email);

//     if (!user) {
//       throw new UserNotFoundException(email.toString());
//     }

//     if (user.status.isLocked()) {
//       throw new UserLockedException();
//     }

//     if (!user.status.isActive()) {
//       throw new InvalidCredentialsException('User account is not active');
//     }

//     // Usando el servicio de encriptación para comparar contraseñas
//     const isPasswordValid = await this.passwordEncryptionService.compare(
//       plainPassword,
//       user.password
//     );

//     if (!isPasswordValid) {
//       throw new InvalidCredentialsException();
//     }

//     user.recordLogin();
//     await this.userRepository.update(user);

//     return user;
//   }
// }
