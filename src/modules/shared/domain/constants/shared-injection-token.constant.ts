export class SharedInjectionToken {
  public static readonly MESSAGE_BROKER = Symbol('MESSAGE_BROKER');
  public static readonly HADES_USER_GATEWAY = Symbol('HADES_USER_GATEWAY');
  public static readonly HADES_ACCOUNT_GATEWAY = Symbol('HADES_ACCOUNT_GATEWAY');
  public static readonly PASSWORD_ENCRYPTION_SERVICE = Symbol('PASSWORD_ENCRYPTION_SERVICE');
}
