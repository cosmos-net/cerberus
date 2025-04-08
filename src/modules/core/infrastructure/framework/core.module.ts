import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationModule } from '@authentication/infrastructure/framework/authentication.module';
import { jwtLoader } from '@core/infrastructure/framework/loaders/jwt-loader';
import { configOption } from '@core/infrastructure/framework/options/config.options';
import { SharedModule } from '@shared/infrastructure/framework/shared.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configOption),
    ConfigModule.forFeature(jwtLoader.jwt),
    CqrsModule,
    SharedModule,
    AuthenticationModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtLoader.jwt)],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.tokenSecret'),
        signOptions: {
          expiresIn: configService.get('jwt.tokenExpiresIn'),
        },
        verifyOptions: {
          algorithms: ['HS256'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [CqrsModule, PassportModule, JwtModule],
})
export class CoreModule {}
