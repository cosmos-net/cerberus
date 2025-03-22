import { ClientProxy, ClientProxyFactory, NatsOptions } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { IMessageBroker } from '@shared/domain/contracts/message-broker.contract';

export class NatsMessageBrokerService implements IMessageBroker {
  private readonly client: ClientProxy;
  constructor(options: NatsOptions) {
    this.client = ClientProxyFactory.create(options);
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  getClient(): ClientProxy {
    return this.client;
  }

  async status(): Promise<string> {
    return lastValueFrom(this.client.status);
  }

  async send<TInput = unknown, TResult = unknown>(pattern: string, data: TInput): Promise<TResult> {
    return lastValueFrom(this.client.send<TResult, TInput>(pattern, data));
  }

  async emit<TInput = unknown>(pattern: string, data: TInput): Promise<void> {
    await lastValueFrom(this.client.emit<TInput>(pattern, data));
  }
}
