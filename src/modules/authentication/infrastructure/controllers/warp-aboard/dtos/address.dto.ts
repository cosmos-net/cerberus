import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  public readonly street: string;

  @IsString()
  @IsNotEmpty()
  public readonly extNumber: string;

  @IsString()
  @IsOptional()
  public readonly intNumber?: string;

  @IsString()
  @IsNotEmpty()
  public readonly neighborhood: string;

  @IsString()
  @IsNotEmpty()
  public readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  public readonly city: string;

  @IsString()
  public readonly state: string;

  @IsString()
  public readonly country: string;
}
