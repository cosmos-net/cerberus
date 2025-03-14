import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CoreModule } from '@core/infrastructure/framework/core.module';
import { HttpExceptionFilter } from '@core/infrastructure/framework/exception-filters/http-exception.filter';
import { MicroserviceExceptionFilter } from '@core/infrastructure/framework/exception-filters/microservice-exception.filter';
import { TimeOutInterceptor } from '@core/infrastructure/framework/globals/timeout-interceptor.global';
import { TransformInterceptor } from '@core/infrastructure/framework/globals/transform-interceptor.global';
import { ValidationPipeWithExceptionFactory } from '@core/infrastructure/framework/globals/validation-pipe.global';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CoreModule, {
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL || 'nats://localhost:4222',
    },
  });

  app.useGlobalPipes(
    new ValidationPipeWithExceptionFactory(),
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
  );

  app.useGlobalInterceptors(new TransformInterceptor(), new TimeOutInterceptor());
  app.useGlobalFilters(new MicroserviceExceptionFilter(), new HttpExceptionFilter());

  await app.listen();

  const logger = new Logger('Bootstrap');
  logger.log(`Microservice is listening on ${process.env.NATS_URL || 'nats://localhost:4222'}`);

  process.on('SIGTERM', () => {
    logger.log('Bye bye!');
    app
      .close()
      .then(() => process.exit())
      .catch((error) => {
        logger.error('Error during shutdown:', error);
        process.exit(1);
      });
  });
}

if (require.main === module) {
  bootstrap().catch((error) => {
    const logger = new Logger('Bootstrap');
    logger.error('Error during bootstrap:', error);
  });
}
