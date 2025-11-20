import { PropertyForm } from '@/types';
import { TypeScriptTypeMapper } from './types';

export class EnumPropertyTypeMapper implements TypeScriptTypeMapper<PropertyForm> {
  mapToTypeScript(prop: PropertyForm): string {
    if (prop.enumValues) {
      const values = prop.enumValues.split(',').map(v => `'${v.trim()}'`);
      return values.join(' | ');
    }
    return 'string';
  }
}
