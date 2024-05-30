import { PayloadAction } from '@reduxjs/toolkit';

export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;


export type PA<T> = PayloadAction<T>;