import { VtexProperty, ArrayItemProperty } from '@/types';
import { PropertyProcessor } from './types';

interface ObjectProperty {
  type: 'object';
  objectProperties?: ArrayItemProperty[];
}

export class ObjectPropertyProcessor implements PropertyProcessor<ObjectProperty> {
  constructor(
    private processArrayItemProperties: (
      items: ArrayItemProperty[]
    ) => {
      properties: { [key: string]: VtexProperty };
      dependencies?: Record<string, { oneOf: Array<{ properties: Record<string, Partial<VtexProperty>> }> }>;
    }
  ) {}

  process(prop: ObjectProperty): Partial<VtexProperty> {
    const property: Partial<VtexProperty> = {};

    if (prop.objectProperties && prop.objectProperties.length > 0) {
      // Processar propriedades do objeto (com suporte a aninhamento)
      const processedResult = this.processArrayItemProperties(prop.objectProperties);
      property.properties = processedResult.properties;
      
      if (processedResult.dependencies && Object.keys(processedResult.dependencies).length > 0) {
        property.dependencies = processedResult.dependencies;
      }
    }

    return property;
  }
}
