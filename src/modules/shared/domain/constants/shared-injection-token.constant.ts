export class SharedInjectionToken {
  public static readonly MESSAGE_BROKER = Symbol('MESSAGE_BROKER');
  public static readonly HADES_GATEWAY = Symbol('HADES_GATEWAY');
  public static readonly PASSWORD_ENCRYPTION_SERVICE = Symbol('PASSWORD_ENCRYPTION_SERVICE');
}
