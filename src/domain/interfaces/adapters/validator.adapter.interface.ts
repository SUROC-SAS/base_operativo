export interface ValidateArray<T> {
  validateSync: (args: unknown, options?: { stripUnknown: boolean }) => T;
  isValidSync: (...args: [unknown]) => boolean;
}
