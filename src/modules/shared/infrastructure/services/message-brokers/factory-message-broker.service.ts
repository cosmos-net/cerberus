import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import {
  IMessageBroker,
  IMessageBrokerConfigType,
} from '@shared/domain/contracts/message-broker.contract';
import { NatsMessageBrokerService } from '@shared/infrastructure/services/message-brokers/nats-message-broker.services';

@Injectable()
export class FactoryMessageBrokerService {
  public constructor(private readonly config: IMessageBrokerConfigType) {}

  private getBroker(): IMessageBroker {
    const { transport } = this.config;

    switch (transport) {
      case Transport.NATS: {
        this.validateOptions(this.config.options, 'NATS');
        return new NatsMessageBrokerService(this.config.options);
      }
      case Transport.KAFKA: {
        throw new Error('Kafka message broker no implementado aún');
      }
      case Transport.RMQ: {
        throw new Error('RabbitMQ message broker no implementado aún');
      }
      case Transport.GRPC: {
        throw new Error('GRPC message broker no implementado aún');
      }
      case Transport.REDIS: {
        throw new Error('Redis message broker no implementado aún');
      }
      case Transport.TCP: {
        throw new Error('TCP message broker no implementado aún');
      }
      case Transport.MQTT: {
        throw new Error('MQTT message broker no implementado aún');
      }
      default: {
        const _exhaustiveCheck: never = transport;
        const message = 'Tipo de broker no soportado';
        this.assertNever(message, _exhaustiveCheck);
      }
    }
  }

  private validateOptions<T extends object>(options: T, transportType: string): void {
    if (!options) {
      throw new Error(`Las opciones son necesarias para el broker ${transportType}`);
    }
  }

  private assertNever(message: string, x: never): never {
    throw new Error(`${message}: ${String(x)}`);
  }

  public static create(config: IMessageBrokerConfigType): IMessageBroker {
    const factory = new FactoryMessageBrokerService(config);
    return factory.getBroker();
  }
}
