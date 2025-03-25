import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  IAccount,
  IProfile,
  WarpAboardCommand,
} from '@authentication/application/use-cases/commands/warp-aboard.command';
import { AuthenticationInjectionToken } from '@authentication/domain/constants/authentication-injection-token.constant';
import { IPasswordEncryptionService } from '@authentication/domain/contracts/password-encryption-service.contract';
import { ManagerPasswordPolicyService } from '@authentication/domain/services/manager-password-policy.service';
import { IHadesUserCreateResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user.response';
import { SharedInjectionToken } from '@shared/domain/constants/shared-injection-token.constant';
import { IHadesGatewayContract } from '@shared/domain/contracts/hades-user-gateway.contract';

@Injectable()
@CommandHandler(WarpAboardCommand)
export class WarpAboardCommandHandler
  implements ICommandHandler<WarpAboardCommand, IHadesUserCreateResponse>
{
  constructor(
    @Inject(AuthenticationInjectionToken.PASSWORD_ENCRYPTION_SERVICE)
    private readonly passwordEncryptionService: IPasswordEncryptionService,
    @Inject(SharedInjectionToken.HADES_GATEWAY)
    private readonly hadesGatewayContract: IHadesGatewayContract,
    private readonly managerPasswordPolicyService: ManagerPasswordPolicyService,
  ) {}

  async execute(command: WarpAboardCommand): Promise<IHadesUserCreateResponse> {
    const { profile, accounts } = command;

    const processedAccounts = await this.processAccounts(accounts, profile);

    return this.hadesGatewayContract.UserWarpOnboard({
      accounts: processedAccounts,
      profile,
    });
  }

  private async processAccounts(accounts: IAccount[], profile: IProfile): Promise<IAccount[]> {
    return Promise.all(accounts.map((account) => this.processAccount(account, profile)));
  }

  private async processAccount(account: IAccount, profile: IProfile): Promise<IAccount> {
    this.managePasswordPolicy(account, profile);

    const encryptedPassword = await this.passwordEncryptionService.encrypt(account.password);

    return {
      ...account,
      password: encryptedPassword,
      passwordConfirmation: encryptedPassword,
    };
  }

  private managePasswordPolicy(account: IAccount, profile: IProfile): void {
    this.managerPasswordPolicyService.validate(account.password, account.passwordConfirmation, {
      email: account.email,
      username: account.username,
      firstName: profile.names,
      lastName: profile.lastName,
      secondLastName: profile.secondLastName,
      phone: profile.phoneNumber,
    });
  }
}
