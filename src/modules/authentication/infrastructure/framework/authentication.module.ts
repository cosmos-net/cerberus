import { Module } from '@nestjs/common';

import { WarpAboardCommand } from '@authentication/application/use-cases/commands/warp-aboard.command';
import { WarpAboardCommandHandler } from '@authentication/application/use-cases/commands/warp-aboard.command-handler';
import { AuthenticationInjectionToken } from '@authentication/domain/constants/authentication-injection-token.constant';
import { ManagerPasswordPolicyService } from '@authentication/domain/services/manager-password-policy.service';
import { WarpAboardController } from '@authentication/infrastructure/controllers/warp-aboard/warp-aboard.controller';
import { BcryptPasswordEncryptionService } from '@authentication/infrastructure/services/bcrypt-service/bcrypt-password-encryption.service';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [WarpAboardController],
  providers: [
    WarpAboardCommand,
    WarpAboardCommandHandler,
    ManagerPasswordPolicyService,
    {
      provide: AuthenticationInjectionToken.PASSWORD_ENCRYPTION_SERVICE,
      useClass: BcryptPasswordEncryptionService,
    },
  ],
  exports: [],
})
export class AuthenticationModule {}
