import * as yup from 'yup';
import { ValidateArray } from '#/domain/interfaces/adapters/validator.adapter.interface';

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

  static validateArray<T extends Array<unknown>>(schema: ValidateArray<unknown>, input: T): [string?, T?] {
    if (!input || !input.length) {
      return ['Invalid input'];
    }

    const isValid = schema.isValidSync(input);
    if (!isValid) {
      return ['Invalid input'];
    }

    const response = schema.validateSync(input, { stripUnknown: true });
    return [undefined, <T>response];
  }
}
