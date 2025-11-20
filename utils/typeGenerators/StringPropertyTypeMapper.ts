import { PropertyForm } from '@/types';
import { TypeScriptTypeMapper } from './types';

export class StringPropertyTypeMapper implements TypeScriptTypeMapper<PropertyForm> {
  mapToTypeScript(prop: PropertyForm): string {
    // Se for enum, retorna union type
    if (prop.enumValues) {
      const values = prop.enumValues.split(',').map(v => `'${v.trim()}'`);
      return values.join(' | ');
    }
    return 'string';
  }
}
