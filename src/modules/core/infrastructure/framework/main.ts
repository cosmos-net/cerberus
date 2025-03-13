import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CoreModule } from '@core/infrastructure/framework/core.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CoreModule, {
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL || 'nats://localhost:4222',
    },
  });
  await app.listen();
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Error during bootstrap:', error);
});
