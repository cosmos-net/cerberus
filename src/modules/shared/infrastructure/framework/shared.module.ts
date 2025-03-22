import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedInjectionToken } from '@shared/domain/constants/shared-injection-token.constant';
import { HadesGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-user-gateway.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    HadesGatewayService,
    {
      provide: SharedInjectionToken.HADES_GATEWAY,
      useClass: HadesGatewayService,
    },
  ],
  exports: [SharedInjectionToken.HADES_GATEWAY, HadesGatewayService],
})
export class SharedModule {}
