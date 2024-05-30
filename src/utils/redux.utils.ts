import { PA } from '../types/utility.types';

// Key extends keyof T>
export const createSetter = <T, Key extends keyof T>(propertyName: keyof T) => (state: T, action: PA<T[Key]>) => {
  state[propertyName] = action.payload;
};