import { VtexProperty, ArrayItemProperty } from '@/types';
import { PropertyProcessor } from './types';

interface ArrayProperty {
  type: 'array';
  arrayItemTitle?: string;
  arrayItemProperties?: ArrayItemProperty[];
  arrayDefaultValue?: string;
  enableEditorItemTitle?: string;
  editorItemTitleLabel?: string;
  editorItemTitleDefault?: string;
}

export class ArrayPropertyProcessor implements PropertyProcessor<ArrayProperty> {
  constructor(
    private processArrayItemProperties: (
      items: ArrayItemProperty[]
    ) => {
      properties: { [key: string]: VtexProperty };
      dependencies?: Record<string, { oneOf: Array<{ properties: Record<string, Partial<VtexProperty>> }> }>;
    }
  ) {}

  process(prop: ArrayProperty): Partial<VtexProperty> {
    const property: Partial<VtexProperty> = {};

    if (prop.arrayItemProperties && prop.arrayItemProperties.length > 0) {
      const itemProperties: { [key: string]: VtexProperty } = {};

      // Adicionar __editorItemTitle se habilitado
      if (prop.enableEditorItemTitle) {
        itemProperties.__editorItemTitle = {
          type: 'string',
          title: prop.editorItemTitleLabel || 'Change item name',
          default: prop.editorItemTitleDefault || 'Item',
        };
      }

      // Processar propriedades do item do array (com suporte a aninhamento)
      const processedResult = this.processArrayItemProperties(prop.arrayItemProperties);
      Object.assign(itemProperties, processedResult.properties);

      property.items = {
        type: 'object',
        title: prop.arrayItemTitle || 'Item',
        properties: itemProperties,
      };

      // Default value para array (se fornecido)
      if (prop.arrayDefaultValue) {
        try {
          property.default = JSON.parse(prop.arrayDefaultValue);
        } catch {
          // Ignora se não for JSON válido
        }
      }
    }

    return property;
  }
}
