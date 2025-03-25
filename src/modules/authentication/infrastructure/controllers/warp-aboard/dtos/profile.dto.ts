import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsDefined,
} from 'class-validator';

import { AddressDTO } from '@authentication/infrastructure/controllers/warp-aboard/dtos/address.dto';

export class ProfileDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsDefined()
  public readonly names: string[];

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public readonly lastName: string;

  @IsString()
  @IsOptional()
  public readonly secondLastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  public readonly gender: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type((): typeof AddressDTO => AddressDTO)
  @IsDefined()
  public readonly address: AddressDTO;
}
