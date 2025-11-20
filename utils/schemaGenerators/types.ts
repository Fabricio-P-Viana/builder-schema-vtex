import { VtexProperty } from '@/types';

export interface PropertyProcessor<T = unknown> {
  process(prop: T): Partial<VtexProperty>;
}

export function setDefaultValue(property: Partial<VtexProperty>, type: string, defaultValue?: string): void {
  if (!defaultValue) return;

  if (type === 'boolean') {
    property.default = defaultValue === 'true';
  } else if (type === 'number') {
    property.default = Number(defaultValue);
  } else {
    property.default = defaultValue;
  }
}
