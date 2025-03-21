import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedInjectionToken } from '@shared/domain/constants/shared-injection-token.constant';
import { HadesGatewayService } from '@shared/infrastructure/services/hades-gateway/hades-user-gateway.service';
import { FactoryMessageBrokerService } from '@shared/infrastructure/services/message-brokers/factory-message-broker.service';
import { NatsMessageBrokerService } from '@shared/infrastructure/services/message-brokers/nats-message-broker.services';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: SharedInjectionToken.HADES_GATEWAY,
      useClass: HadesGatewayService,
    },
    FactoryMessageBrokerService,
    NatsMessageBrokerService,
  ],
  exports: [HadesGatewayService],
})
export class SharedModule {}
