import { VtexProperty } from '@/types';
import { PropertyProcessor } from './types';

interface EnumProperty {
  type: 'enum';
  enumValues?: string;
  enumNames?: string;
}

export class EnumPropertyProcessor implements PropertyProcessor<EnumProperty> {
  process(prop: EnumProperty): Partial<VtexProperty> {
    const property: Partial<VtexProperty> = {};

    if (prop.enumValues) {
      property.enum = prop.enumValues.split(',').map((v) => v.trim());
      
      if (prop.enumNames) {
        property.enumNames = prop.enumNames.split(',').map((v) => v.trim());
      }
    }

    return property;
  }
}
