import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedInjectionToken } from '@shared/domain/constants/shared-injection-token.constant';
import { HadesAccountGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-account-gateway.service';
import { HadesUserGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-user-gateway.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    HadesUserGatewayService,
    HadesAccountGatewayService,
    {
      provide: SharedInjectionToken.HADES_USER_GATEWAY,
      useClass: HadesUserGatewayService,
    },
    {
      provide: SharedInjectionToken.HADES_ACCOUNT_GATEWAY,
      useClass: HadesAccountGatewayService,
    },
  ],
  exports: [SharedInjectionToken.HADES_USER_GATEWAY, HadesUserGatewayService],
})
export class SharedModule {}
