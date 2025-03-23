import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthenticationModule } from '@authentication/infrastructure/framework/authentication.module';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Global()
@Module({
  imports: [CqrsModule, SharedModule, AuthenticationModule],
  controllers: [],
  providers: [],
  exports: [CqrsModule],
})
export class CoreModule {}
