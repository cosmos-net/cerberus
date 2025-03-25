import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { WarpAboardCommand } from '@authentication/application/use-cases/commands/warp-aboard.command';
import { WarpAboardRequestDTO } from '@authentication/infrastructure/controllers/warp-aboard/warp-aboard-request.dto';
import { WarpAboardResponseDto } from '@authentication/infrastructure/controllers/warp-aboard/warp-aboard-response.dto';
import { EXTERNAL_COMMANDS } from '@common/infrastructure/controllers/external-commands';
import { IHadesUserCreateResponse } from '@shared/domain/anti-corruption-layer/hades-user-schemas/create-user/hades-user.response';

@Controller()
export class WarpAboardController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: EXTERNAL_COMMANDS.HADES.USER.CREATE })
  async createUser(@Payload() dto: WarpAboardRequestDTO): Promise<WarpAboardResponseDto> {
    const { accounts, profile } = dto;

    const command = new WarpAboardCommand(accounts, profile);

    const result = await this.commandBus.execute<WarpAboardCommand, IHadesUserCreateResponse>(
      command,
    );

    return {
      success: true,
      message: 'User created successfully',
      userUUID: result.uuid,
    };
  }
}
