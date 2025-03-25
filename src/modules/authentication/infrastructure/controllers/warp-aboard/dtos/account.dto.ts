import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AccountDTO {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly passwordConfirmation: string;
}
