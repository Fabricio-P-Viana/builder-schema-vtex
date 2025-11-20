import { ArrayItemProperty } from '@/types';

export interface TypeScriptTypeMapper<T = unknown> {
  mapToTypeScript(prop: T): string;
}

export function generateArrayItemType(items: ArrayItemProperty[], depth: number = 0): string {
  const indent = '    ' + '  '.repeat(depth);
  const itemProps: string[] = [];
  
  items.forEach((itemProp) => {
    if (!itemProp.name) return;
    
    const mapper = getTypeMapperForItem(itemProp);
    const itemType = mapper.mapToTypeScript(itemProp);
    
    itemProps.push(`${indent}${itemProp.name}: ${itemType};`);
  });
  
  return `{\n${itemProps.join('\n')}\n${indent.slice(0, -2)}}`;
}

function getTypeMapperForItem(prop: ArrayItemProperty): TypeScriptTypeMapper<ArrayItemProperty> {
  switch (prop.type) {
    case 'string':
      return new StringTypeMapper();
    case 'enum':
      return new EnumTypeMapper();
    case 'array':
      return new ArrayTypeMapper();
    case 'object':
      return new ObjectTypeMapper();
    case 'number':
      return new NumberTypeMapper();
    case 'boolean':
      return new BooleanTypeMapper();
    default:
      return new AnyTypeMapper();
  }
}

class StringTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(prop: ArrayItemProperty): string {
    if (prop.type === 'enum' && 'enumValues' in prop && prop.enumValues) {
      const values = prop.enumValues.split(',').map((v: string) => `'${v.trim()}'`);
      return values.join(' | ');
    }
    return 'string';
  }
}

class EnumTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(prop: ArrayItemProperty): string {
    if ('enumValues' in prop && prop.enumValues) {
      const values = prop.enumValues.split(',').map((v: string) => `'${v.trim()}'`);
      return values.join(' | ');
    }
    return 'string';
  }
}

class ArrayTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(prop: ArrayItemProperty): string {
    if ('arrayItemProperties' in prop && prop.arrayItemProperties && prop.arrayItemProperties.length > 0) {
      const arrayItemType = generateArrayItemType(prop.arrayItemProperties, 1);
      return `Array<${arrayItemType}>`;
    }
    return 'Array<any>';
  }
}

class ObjectTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(prop: ArrayItemProperty): string {
    if ('objectProperties' in prop && prop.objectProperties && prop.objectProperties.length > 0) {
      return generateArrayItemType(prop.objectProperties, 1);
    }
    return 'Record<string, any>';
  }
}

class NumberTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(): string {
    return 'number';
  }
}

class BooleanTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(): string {
    return 'boolean';
  }
}

class AnyTypeMapper implements TypeScriptTypeMapper<ArrayItemProperty> {
  mapToTypeScript(): string {
    return 'any';
  }
}
