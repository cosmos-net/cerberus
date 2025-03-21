import {
  ClientProxy,
  KafkaOptions,
  MqttOptions,
  NatsOptions,
  RmqOptions,
  TcpOptions,
  GrpcOptions,
  RedisOptions,
  Transport,
} from '@nestjs/microservices';

export interface IMessageBroker {
  connect(): Promise<void>;
  close(): Promise<void>;
  getClient(): ClientProxy;
  status(): Promise<string>;
  send<TInput, TResult>(pattern: string, data: TInput): Promise<TResult>;
  emit<TInput>(pattern: string, data: TInput): Promise<void>;
}

export type IMessageBrokerConfigType =
  | {
      transport: Transport.NATS;
      options: NatsOptions;
    }
  | {
      transport: Transport.KAFKA;
      options: KafkaOptions;
    }
  | {
      transport: Transport.RMQ;
      options: RmqOptions;
    }
  | {
      transport: Transport.GRPC;
      options: GrpcOptions;
    }
  | {
      transport: Transport.REDIS;
      options: RedisOptions;
    }
  | {
      transport: Transport.TCP;
      options: TcpOptions;
    }
  | {
      transport: Transport.MQTT;
      options: MqttOptions;
    };
