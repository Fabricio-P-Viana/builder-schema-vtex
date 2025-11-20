import { PropertyForm } from '@/types';
import { TypeScriptTypeMapper, generateArrayItemType } from './types';

export class ObjectPropertyTypeMapper implements TypeScriptTypeMapper<PropertyForm> {
  mapToTypeScript(prop: PropertyForm): string {
    if (prop.objectProperties && prop.objectProperties.length > 0) {
      // Gerar tipo inline para as propriedades do objeto
      return generateArrayItemType(prop.objectProperties);
    }
    return 'Record<string, any>';
  }
}
