import * as yup from 'yup';

interface ValidateArray<T> {
  validateSync: T;
  isValidSync: boolean;
}

export const GENERATOR = yup;
export class Validator {
  static validateObject<T>(schema: Record<string, any>, input: Record<string, unknown>): [string?, T?] {
    const mutatedSchema = yup.object().shape(schema);
    const isValid = mutatedSchema.isValidSync(input);
    if (!isValid) {
      return ['Invalid input'];
    }

    const response = mutatedSchema.validateSync(input, { stripUnknown: true }) as T;
    return [undefined, response];
  }

  static validateArray<T = Array<unknown>>(schema: ValidateArray<T>, input: T): [string?, T?] {
    return [];
  }
}