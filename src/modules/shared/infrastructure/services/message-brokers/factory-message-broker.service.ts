import { Transport } from '@nestjs/microservices';

import {
  IMessageBroker,
  IMessageBrokerConfigType,
} from '@shared/domain/contracts/message-broker.contract';
import { NatsMessageBrokerService } from '@shared/infrastructure/services/message-brokers/nats-message-broker.services';

export class FactoryMessageBrokerService {
  public constructor(private readonly brokerConfigType: IMessageBrokerConfigType) {
    this.setup();
  }

  private messageBroker: IMessageBroker;

  private setup(): void {
    const { transport } = this.brokerConfigType;

    switch (transport) {
      case Transport.NATS: {
        this.validateOptions(this.brokerConfigType.options, 'NATS');
        this.messageBroker = new NatsMessageBrokerService(this.brokerConfigType.options);
        break;
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

  public get config(): IMessageBroker {
    return this.messageBroker;
  }

  public static create(config: IMessageBrokerConfigType): FactoryMessageBrokerService {
    return new FactoryMessageBrokerService(config);
  }
}
