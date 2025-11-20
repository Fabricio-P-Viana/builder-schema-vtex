import { VtexProperty, ConditionalField, WidgetType } from '@/types';
import { PropertyProcessor, setDefaultValue } from './types';

interface ConditionalProperty {
  type: 'conditional';
  name: string;
  conditionalFields?: ConditionalField[];
}

export class ConditionalPropertyProcessor implements PropertyProcessor<ConditionalProperty> {
  process(
    prop: ConditionalProperty
  ): {
    property: Partial<VtexProperty>;
    dependencies?: Record<string, { oneOf: Array<{ properties: Record<string, Partial<VtexProperty>> }> }>;
  } {
    const property: Partial<VtexProperty> = {
      type: 'string',
      enum: ['none', 'provide'],
      enumNames: ['Não', 'Sim'],
      default: 'none',
      widget: { 'ui:widget': 'radio' },
    };

    let dependencies: Record<string, { oneOf: Array<{ properties: Record<string, Partial<VtexProperty>> }> }> | undefined;

    // Se houver campos condicionais, adiciona dependencies
    if (prop.conditionalFields && prop.conditionalFields.length > 0 && prop.name) {
      const triggerValue = 'provide';
      const conditionalProperties: Record<string, Partial<VtexProperty>> = {};

      // Adiciona o próprio campo com enum restrito ao valor trigger
      conditionalProperties[prop.name] = {
        enum: [triggerValue],
      };

      // Adiciona os campos condicionais
      prop.conditionalFields.forEach((condField) => {
        if (!condField.name) return;

        const condProperty: Partial<VtexProperty> = {
          type: condField.type === 'conditional' || condField.type === 'enum' ? 'string' : condField.type,
          // title não deve ser incluído em dependencies
        };

        if (condField.description) condProperty.description = condField.description;

        setDefaultValue(condProperty, condField.type, condField.defaultValue);

        // Widget e formato para string
        if (condField.type === 'string') {
          if (condField.widget) {
            condProperty.widget = { 'ui:widget': condField.widget as WidgetType };
          }
          if (condField.format) {
            condProperty.format = condField.format;
          }
        }

        // Enum
        if (condField.type === 'enum' && condField.enumValues) {
          condProperty.enum = condField.enumValues.split(',').map((v) => v.trim());
          if (condField.enumNames) {
            condProperty.enumNames = condField.enumNames.split(',').map((v) => v.trim());
          }
        }

        conditionalProperties[condField.name] = condProperty;
      });

      dependencies = {
        [prop.name]: {
          oneOf: [
            {
              properties: conditionalProperties,
            },
          ],
        },
      };
    }

    return { property, dependencies };
  }
}
