import { 
  PropertyForm, 
  VtexSchemaDefinition, 
  VtexProperty, 
  ArrayItemProperty,
  ArrayArrayItemProperty,
  ObjectArrayItemProperty,
  EnumArrayItemProperty,
  StringArrayItemProperty
} from '@/types';
import {
  StringPropertyProcessor,
  EnumPropertyProcessor,
  ArrayPropertyProcessor,
  ObjectPropertyProcessor,
  ConditionalPropertyProcessor,
  setDefaultValue
} from './schemaGenerators';

/**
 * Type guard para propriedades do tipo array
 */
function isArrayProperty(prop: ArrayItemProperty): prop is ArrayArrayItemProperty {
  return prop.type === 'array';
}

/**
 * Type guard para propriedades do tipo object
 */
function isObjectProperty(prop: ArrayItemProperty): prop is ObjectArrayItemProperty {
  return prop.type === 'object';
}

/**
 * Type guard para propriedades do tipo enum
 */
function isEnumProperty(prop: ArrayItemProperty): prop is EnumArrayItemProperty {
  return prop.type === 'enum';
}

/**
 * Type guard para propriedades do tipo string
 */
function isStringProperty(prop: ArrayItemProperty): prop is StringArrayItemProperty {
  return prop.type === 'string';
}

/**
 * Processa recursivamente propriedades de array/object aninhados
 * Retorna tanto as properties quanto as dependencies
 */
function processArrayItemProperties(
  items: ArrayItemProperty[]
): {
  properties: { [key: string]: VtexProperty };
  dependencies?: Record<string, { oneOf: Array<{ properties: Record<string, Partial<VtexProperty>> }> }>;
} {
  const properties: { [key: string]: VtexProperty } = {};
  const dependencies: Record<string, { oneOf: Array<{ properties: Record<string, Partial<VtexProperty>> }> }> = {};

  const stringProcessor = new StringPropertyProcessor();
  const enumProcessor = new EnumPropertyProcessor();
  const arrayProcessor = new ArrayPropertyProcessor(processArrayItemProperties);
  const objectProcessor = new ObjectPropertyProcessor(processArrayItemProperties);
  const conditionalProcessor = new ConditionalPropertyProcessor();

  items.forEach((itemProp) => {
    if (!itemProp.name) return;

    const itemProperty: VtexProperty = {
      type: (itemProp.type === 'conditional' || itemProp.type === 'enum') ? 'string' : itemProp.type,
      title: itemProp.title,
    };

    if (itemProp.description) itemProperty.description = itemProp.description;

    setDefaultValue(itemProperty, itemProp.type, itemProp.defaultValue);

    // Processar campos específicos por tipo usando processadores
    if (isStringProperty(itemProp)) {
      Object.assign(itemProperty, stringProcessor.process(itemProp));
    }

    if (isEnumProperty(itemProp)) {
      Object.assign(itemProperty, enumProcessor.process(itemProp));
    }

    // Processar conditional
    if (itemProp.type === 'conditional') {
      const result = conditionalProcessor.process({
        type: 'conditional',
        name: itemProp.name,
        conditionalFields: 'conditionalFields' in itemProp && Array.isArray(itemProp.conditionalFields)
          ? itemProp.conditionalFields
          : undefined
      });
      Object.assign(itemProperty, result.property);
      if (result.dependencies) {
        Object.assign(dependencies, result.dependencies);
      }
    }

    // Processar array aninhado
    if (isArrayProperty(itemProp)) {
      Object.assign(itemProperty, arrayProcessor.process(itemProp));
    }

    // Processar objeto aninhado
    if (isObjectProperty(itemProp)) {
      Object.assign(itemProperty, objectProcessor.process(itemProp));
    }

    properties[itemProp.name] = itemProperty;
  });

  return {
    properties,
    dependencies: Object.keys(dependencies).length > 0 ? dependencies : undefined,
  };
}

/**
 * Gera o schema VTEX a partir das propriedades do formulário
 * @param properties Array de propriedades do formulário
 * @param componentTitle Título do componente
 * @returns Schema VTEX completo
 */
export function generateVtexSchema(
  properties: PropertyForm[],
  componentTitle: string
): VtexSchemaDefinition {
  const schemaProperties: Record<string, VtexProperty> = {};
  const pendingDependencies: NonNullable<VtexSchemaDefinition['dependencies']> = {};

  const stringProcessor = new StringPropertyProcessor();
  const enumProcessor = new EnumPropertyProcessor();
  const arrayProcessor = new ArrayPropertyProcessor(processArrayItemProperties);
  const objectProcessor = new ObjectPropertyProcessor(processArrayItemProperties);
  const conditionalProcessor = new ConditionalPropertyProcessor();

  properties.forEach((prop) => {
    if (!prop.name) return;

    const property: VtexProperty = {
      type: prop.type === 'conditional' || prop.type === 'enum' ? 'string' : prop.type,
      title: prop.title,
    };

    if (prop.description) property.description = prop.description;

    setDefaultValue(property, prop.type, prop.defaultValue);

    // Processar campos específicos por tipo usando processadores
    if (prop.type === 'string') {
      Object.assign(property, stringProcessor.process(prop as { type: 'string'; widget?: string; format?: string; defaultValue?: string }));
    }

    if (prop.type === 'enum') {
      Object.assign(property, enumProcessor.process(prop as { type: 'enum'; enumValues?: string; enumNames?: string }));
    }

    if (prop.type === 'object') {
      Object.assign(property, objectProcessor.process(prop as { type: 'object'; objectProperties?: ArrayItemProperty[] }));
    }

    if (prop.type === 'array') {
      Object.assign(property, arrayProcessor.process(prop as { type: 'array'; arrayItemTitle?: string; arrayItemProperties?: ArrayItemProperty[]; arrayDefaultValue?: string; enableEditorItemTitle?: string; editorItemTitleLabel?: string; editorItemTitleDefault?: string }));
    }

    // Configuração de Conditional
    if (prop.type === 'conditional') {
      const result = conditionalProcessor.process({
        type: 'conditional',
        name: prop.name,
        conditionalFields: prop.conditionalFields
      });
      Object.assign(property, result.property);
      if (result.dependencies) {
        Object.assign(pendingDependencies, result.dependencies);
      }
    }

    schemaProperties[prop.name] = property;
  });

  const schema: VtexSchemaDefinition = {
    title: componentTitle,
    type: 'object',
    properties: schemaProperties,
  };

  if (Object.keys(pendingDependencies).length > 0) {
    schema.dependencies = pendingDependencies;
  }

  return schema;
}
