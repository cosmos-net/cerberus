import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDefined, ValidateNested } from 'class-validator';

import { AccountDTO } from '@authentication/infrastructure/controllers/warp-aboard/dtos/account.dto';
import { ProfileDTO } from '@authentication/infrastructure/controllers/warp-aboard/dtos/profile.dto';

export class WarpAboardRequestDTO {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type((): typeof AccountDTO => AccountDTO)
  @IsDefined()
  public readonly accounts: AccountDTO[];

  @ValidateNested()
  @Type((): typeof ProfileDTO => ProfileDTO)
  @IsDefined()
  public readonly profile: ProfileDTO;
}
