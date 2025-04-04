import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedInjectionToken } from '@shared/domain/constants/shared-injection-token.constant';
import { JwtAuthGuard } from '@shared/infrastructure/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '@shared/infrastructure/guards/jwt-refresh.guard';
import { HadesAccountGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-account-gateway.service';
import { HadesUserGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-user-gateway.service';
import { JwtRefreshTokenStrategy } from '@shared/infrastructure/strategies/jwt-refresh-token.strategy';
import { JwtStrategy } from '@shared/infrastructure/strategies/jwt.strategy';

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
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtAuthGuard,
    JwtRefreshGuard,
  ],
  exports: [
    SharedInjectionToken.HADES_USER_GATEWAY,
    HadesUserGatewayService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtAuthGuard,
    JwtRefreshGuard,
  ],
})
export class SharedModule {}
