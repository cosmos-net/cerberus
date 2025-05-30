export abstract class Entity<T> {
  constructor(protected readonly entityRoot: T) {}

  public equals(entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    return JSON.stringify(this.entityRoot) === JSON.stringify(entity.entityRoot);
  }
}
