import { Injectable, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import {
  IMessageBroker,
  IMessageBrokerConfigType,
} from '@shared/domain/contracts/message-broker.contract';
import { HadesCommunicationException } from '@shared/infrastructure/exceptions/broker-communication.exception';
import { HadesConnectionException } from '@shared/infrastructure/exceptions/broker-connection.exception';
import { HadesDisconnectionException } from '@shared/infrastructure/exceptions/broker-disconnection.exception';
import { FactoryMessageBrokerService } from '@shared/infrastructure/services/message-brokers/factory-message-broker.service';

@Injectable()
export class HadesGatewayService {
  private readonly logger = new Logger(HadesGatewayService.name);
  private readonly messageBroker: IMessageBroker;

  constructor() {
    this.messageBroker = this.generateMessageBrokerBy({
      transport: Transport.NATS,
      options: {
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'hades-user-gateway',
        },
      },
    });
  }

  private generateMessageBrokerBy(config: IMessageBrokerConfigType): IMessageBroker {
    try {
      const messageBroker = FactoryMessageBrokerService.create(config);
      return messageBroker.config;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error creating message broker: ${errorMessage}`);
      throw error;
    }
  }

  private async openConnection(messageBroker: IMessageBroker): Promise<void> {
    try {
      await messageBroker.connect();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HadesConnectionException(`Error opening connection: ${errorMessage}`);
    }
  }

  private async closeConnection(messageBroker: IMessageBroker): Promise<void> {
    try {
      await messageBroker.close();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HadesDisconnectionException(`Error closing connection: ${errorMessage}`);
    }
  }

  protected async sendMessage<TInput, TResult>(pattern: string, data: TInput): Promise<TResult> {
    await this.openConnection(this.messageBroker);

    try {
      return await this.messageBroker.send<TInput, TResult>(pattern, data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HadesCommunicationException(`Error sending message: ${errorMessage}`);
    } finally {
      await this.closeConnection(this.messageBroker);
    }
  }

  protected async emitMessage<TInput>(pattern: string, data: TInput): Promise<void> {
    await this.openConnection(this.messageBroker);

    try {
      await this.messageBroker.emit<TInput>(pattern, data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error emitting message: ${errorMessage}`);
      throw error;
    } finally {
      await this.closeConnection(this.messageBroker);
    }
  }
}
