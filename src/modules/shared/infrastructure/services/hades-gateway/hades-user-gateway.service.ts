import { Injectable, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { EXTERNAL_COMMANDS } from '@common/infrastructure/controllers/external-commands';
import { IHadesUserCreateRequest } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user-create.request';
import { IHadesUserCreateResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user.response';
import { IHadesGatewayContract } from '@shared/domain/contracts/hades-user-gateway.contract';
import {
  IMessageBroker,
  IMessageBrokerConfigType,
} from '@shared/domain/contracts/message-broker.contract';
import { HadesCommunicationException } from '@shared/infrastructure/exceptions/broker-communication.exception';
import { HadesConnectionException } from '@shared/infrastructure/exceptions/broker-connection.exception';
import { HadesDisconnectionException } from '@shared/infrastructure/exceptions/broker-disconnection.exception';
import { FactoryMessageBrokerService } from '@shared/infrastructure/services/message-brokers/factory-message-broker.service';

@Injectable()
export class HadesGatewayService implements IHadesGatewayContract {
  private readonly logger = new Logger(HadesGatewayService.name);

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

  private openConnection(messageBroker: IMessageBroker): Promise<void> {
    try {
      return messageBroker.connect();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HadesConnectionException(`Error opening connection: ${errorMessage}`);
    }
  }

  private closeConnection(messageBroker: IMessageBroker): Promise<void> {
    try {
      return messageBroker.close();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HadesDisconnectionException(`Error closing connection: ${errorMessage}`);
    }
  }

  private async sendMessage<TInput, TResult>(
    messageBroker: IMessageBroker,
    pattern: string,
    data: TInput,
  ): Promise<TResult> {
    try {
      return messageBroker.send<TInput, TResult>(pattern, data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HadesCommunicationException(`Error sending message: ${errorMessage}`);
    }
  }

  private async emitMessage<TInput>(
    messageBroker: IMessageBroker,
    pattern: string,
    data: TInput,
  ): Promise<void> {
    try {
      await messageBroker.emit<TInput>(pattern, data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error emitting message: ${errorMessage}`);
      throw error;
    }
  }

  async UserWarpOnboard(request: IHadesUserCreateRequest): Promise<IHadesUserCreateResponse> {
    this.logger.log('UserWarpOnboard request initiated');

    const messageBroker = this.generateMessageBrokerBy({
      transport: Transport.NATS,
      options: {
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'hades-user-gateway',
        },
      },
    });

    await this.openConnection(messageBroker);

    const response = await this.sendMessage<IHadesUserCreateRequest, IHadesUserCreateResponse>(
      messageBroker,
      EXTERNAL_COMMANDS.HADES.USER.CREATE,
      request,
    );

    await this.closeConnection(messageBroker);

    return response;
  }
}
