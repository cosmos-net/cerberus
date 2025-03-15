export type DeepPartialType<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartialType<U>[]
    : T[P] extends object
      ? DeepPartialType<T[P]>
      : T[P];
};

export type PartialExceptType<T, K extends keyof T> = {
  [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]?: T[P] extends object ? PartialExceptType<T[P], keyof T[P]> : T[P];
};
