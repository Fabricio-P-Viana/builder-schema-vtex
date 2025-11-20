import { PropertyForm } from '@/types';
import { TypeScriptTypeMapper, generateArrayItemType } from './types';

export class ArrayPropertyTypeMapper implements TypeScriptTypeMapper<PropertyForm> {
  mapToTypeScript(prop: PropertyForm): string {
    if (prop.arrayItemProperties && prop.arrayItemProperties.length > 0) {
      // Gerar tipo inline para os itens do array com suporte a aninhamento
      const arrayItemType = generateArrayItemType(prop.arrayItemProperties);
      
      if (prop.enableEditorItemTitle) {
        // Adicionar __editorItemTitle no tipo
        return `Array<${arrayItemType.replace('{', '{\n    __editorItemTitle?: string;')}>`;
      }
      
      return `Array<${arrayItemType}>`;
    }
    return 'Array<any>';
  }
}
