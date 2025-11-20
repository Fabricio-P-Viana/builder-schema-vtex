import { PropertyNavigatorFactory } from './PropertyNavigatorFactory';
import { PropertyForm, ArrayItemProperty, ConditionalField } from '@/types';

describe('PropertyNavigatorFactory', () => {
  let factory: PropertyNavigatorFactory;

  beforeEach(() => {
    factory = new PropertyNavigatorFactory();
  });

  describe('Array Property Navigation', () => {
    const createArrayProperty = (): PropertyForm => ({
      id: 'array1',
      name: 'images',
      type: 'array',
      title: 'Images',
      required: true,
      arrayItemProperties: [
        { id: 'item1', name: 'src', type: 'string', title: 'Source' },
        { id: 'item2', name: 'alt', type: 'string', title: 'Alt Text' }
      ]
    });

    it('should identify array property as having children', () => {
      const property = createArrayProperty();
      expect(factory.hasChildren(property)).toBe(true);
    });

    it('should get children from array property', () => {
      const property = createArrayProperty();
      const children = factory.getChildren(property);

      expect(children).toHaveLength(2);
      expect(children?.[0].name).toBe('src');
      expect(children?.[1].name).toBe('alt');
    });

    it('should identify array property as supporting adding children', () => {
      const property = createArrayProperty();
      expect(factory.canAddChildren(property)).toBe(true);
    });

    it('should return correct count for array property', () => {
      const property = createArrayProperty();
      expect(factory.getChildrenCount(property)).toBe(2);
    });

    it('should handle empty array property', () => {
      const property: PropertyForm = {
        ...createArrayProperty(),
        arrayItemProperties: []
      };

      expect(factory.hasChildren(property)).toBe(false);
      expect(factory.getChildren(property)).toEqual([]);
      expect(factory.getChildrenCount(property)).toBe(0);
    });

    it('should handle array property without items', () => {
      const property: PropertyForm = {
        ...createArrayProperty(),
        arrayItemProperties: undefined
      };

      expect(factory.hasChildren(property)).toBe(false);
      expect(factory.getChildren(property)).toBeNull();
      expect(factory.getChildrenCount(property)).toBe(0);
    });
  });

  describe('Object Property Navigation', () => {
    const createObjectProperty = (): PropertyForm => ({
      id: 'obj1',
      name: 'metadata',
      type: 'object',
      title: 'Metadata',
      required: true,
      objectProperties: [
        { id: 'prop1', name: 'author', type: 'string', title: 'Author', required: true },
        { id: 'prop2', name: 'date', type: 'string', title: 'Date', required: true }
      ]
    });

    it('should identify object property as having children', () => {
      const property = createObjectProperty();
      expect(factory.hasChildren(property)).toBe(true);
    });

    it('should get children from object property', () => {
      const property = createObjectProperty();
      const children = factory.getChildren(property);

      expect(children).toHaveLength(2);
      expect(children?.[0].name).toBe('author');
      expect(children?.[1].name).toBe('date');
    });

    it('should identify object property as supporting adding children', () => {
      const property = createObjectProperty();
      expect(factory.canAddChildren(property)).toBe(true);
    });

    it('should return correct count for object property', () => {
      const property = createObjectProperty();
      expect(factory.getChildrenCount(property)).toBe(2);
    });

    it('should handle empty object property', () => {
      const property: PropertyForm = {
        ...createObjectProperty(),
        objectProperties: []
      };

      expect(factory.hasChildren(property)).toBe(false);
      expect(factory.getChildren(property)).toEqual([]);
      expect(factory.getChildrenCount(property)).toBe(0);
    });

    it('should handle object property without properties', () => {
      const property: PropertyForm = {
        ...createObjectProperty(),
        objectProperties: undefined
      };

      expect(factory.hasChildren(property)).toBe(false);
      expect(factory.getChildren(property)).toBeNull();
      expect(factory.getChildrenCount(property)).toBe(0);
    });
  });

  describe('Conditional Property Navigation', () => {
    const createConditionalProperty = (): PropertyForm => ({
      id: 'cond1',
      name: 'settings',
      type: 'conditional',
      title: 'Settings',
      required: true,
      conditionalFields: [
        { id: 'field1', name: 'option1', type: 'boolean', title: 'Option 1' },
        { id: 'field2', name: 'option2', type: 'string', title: 'Option 2' }
      ]
    });

    it('should identify conditional property as having children', () => {
      const property = createConditionalProperty();
      expect(factory.hasChildren(property)).toBe(true);
    });

    it('should get children from conditional property', () => {
      const property = createConditionalProperty();
      const children = factory.getChildren(property);

      expect(children).toHaveLength(2);
      expect(children?.[0].name).toBe('option1');
      expect(children?.[1].name).toBe('option2');
    });

    it('should identify conditional property as supporting adding children', () => {
      const property = createConditionalProperty();
      expect(factory.canAddChildren(property)).toBe(true);
    });

    it('should return correct count for conditional property', () => {
      const property = createConditionalProperty();
      expect(factory.getChildrenCount(property)).toBe(2);
    });

    it('should handle empty conditional property', () => {
      const property: PropertyForm = {
        ...createConditionalProperty(),
        conditionalFields: []
      };

      expect(factory.hasChildren(property)).toBe(false);
      expect(factory.getChildren(property)).toEqual([]);
      expect(factory.getChildrenCount(property)).toBe(0);
    });

    it('should handle conditional property without fields', () => {
      const property: PropertyForm = {
        ...createConditionalProperty(),
        conditionalFields: undefined
      };

      expect(factory.hasChildren(property)).toBe(false);
      expect(factory.getChildren(property)).toBeNull();
      expect(factory.getChildrenCount(property)).toBe(0);
    });
  });

  describe('Primitive Property Navigation', () => {
    it('should return false for string property hasChildren', () => {
      const property: PropertyForm = {
        id: 'str1',
        name: 'title',
        type: 'string',
        title: 'Title',
        required: true
      };

      expect(factory.hasChildren(property)).toBe(false);
    });

    it('should return null for string property getChildren', () => {
      const property: PropertyForm = {
        id: 'str1',
        name: 'title',
        type: 'string',
        title: 'Title',
        required: true
      };

      expect(factory.getChildren(property)).toBeNull();
    });

    it('should return false for primitive property canAddChildren', () => {
      const primitiveTypes: Array<'string' | 'number' | 'boolean' | 'enum'> = 
        ['string', 'number', 'boolean', 'enum'];

      primitiveTypes.forEach(type => {
        const property: PropertyForm = {
          id: `${type}1`,
          name: type,
          type,
          title: type,
          required: true
        };

        expect(factory.canAddChildren(property)).toBe(false);
      });
    });

    it('should return 0 for primitive property getChildrenCount', () => {
      const property: PropertyForm = {
        id: 'num1',
        name: 'count',
        type: 'number',
        title: 'Count',
        required: true
      };

      expect(factory.getChildrenCount(property)).toBe(0);
    });
  });

  describe('Nested Properties', () => {
    it('should navigate through nested array items', () => {
      const nestedArray: ArrayItemProperty = {
        id: 'nested',
        name: 'nestedArray',
        type: 'array',
        title: 'Nested Array',
        arrayItemProperties: [
          { id: 'deep1', name: 'deepField', type: 'string', title: 'Deep Field' }
        ]
      };

      expect(factory.hasChildren(nestedArray)).toBe(true);
      expect(factory.getChildrenCount(nestedArray)).toBe(1);
      
      const children = factory.getChildren(nestedArray);
      expect(children?.[0].name).toBe('deepField');
    });

    it('should navigate through nested object properties', () => {
      const nestedObject: ArrayItemProperty = {
        id: 'nested',
        name: 'nestedObject',
        type: 'object',
        title: 'Nested Object',
        objectProperties: [
          { id: 'deep1', name: 'deepProp', type: 'number', title: 'Deep Prop' }
        ]
      };

      expect(factory.hasChildren(nestedObject)).toBe(true);
      expect(factory.getChildrenCount(nestedObject)).toBe(1);
      
      const children = factory.getChildren(nestedObject);
      expect(children?.[0].name).toBe('deepProp');
    });

    it('should handle deeply nested structures', () => {
      const deeplyNested: PropertyForm = {
        id: 'root',
        name: 'root',
        type: 'object',
        title: 'Root',
        required: true,
        objectProperties: [
          {
            id: 'level1',
            name: 'level1',
            type: 'array',
            title: 'Level 1',
            required: true,
            arrayItemProperties: [
              {
                id: 'level2',
                name: 'level2',
                type: 'object',
                title: 'Level 2',
                objectProperties: [
                  {
                    id: 'level3',
                    name: 'level3',
                    type: 'string',
                    title: 'Level 3',
                    required: true
                  }
                ]
              }
            ]
          }
        ]
      };

      const level1Children = factory.getChildren(deeplyNested);
      expect(level1Children).toHaveLength(1);
      expect(level1Children?.[0].type).toBe('array');

      const level2Children = factory.getChildren(level1Children![0]);
      expect(level2Children).toHaveLength(1);
      expect(level2Children?.[0].type).toBe('object');

      const level3Children = factory.getChildren(level2Children![0]);
      expect(level3Children).toHaveLength(1);
      expect(level3Children?.[0].type).toBe('string');
      expect(level3Children?.[0].name).toBe('level3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle property with multiple child types', () => {
      const property: PropertyForm = {
        id: 'multi',
        name: 'multi',
        type: 'object',
        title: 'Multi',
        required: true,
        objectProperties: [
          { id: '1', name: 'string', type: 'string', title: 'String', required: true },
          { id: '2', name: 'number', type: 'number', title: 'Number', required: true },
          { id: '3', name: 'boolean', type: 'boolean', title: 'Boolean', required: true },
          {
            id: '4',
            name: 'nested',
            type: 'array',
            title: 'Nested',
            required: true,
            arrayItemProperties: []
          }
        ]
      };

      const children = factory.getChildren(property);
      expect(children).toHaveLength(4);
      expect(children?.map(c => c.type)).toEqual(['string', 'number', 'boolean', 'array']);
    });

    it('should handle ConditionalField items', () => {
      const conditionalField: ConditionalField = {
        id: 'cfield',
        name: 'myField',
        type: 'string',
        title: 'My Field'
      };

      // ConditionalField não tem children
      expect(factory.hasChildren(conditionalField)).toBe(false);
      expect(factory.getChildren(conditionalField)).toBeNull();
      expect(factory.canAddChildren(conditionalField)).toBe(false);
      expect(factory.getChildrenCount(conditionalField)).toBe(0);
    });

    it('should return consistent results for same property', () => {
      const property: PropertyForm = {
        id: 'test',
        name: 'test',
        type: 'array',
        title: 'Test',
        required: true,
        arrayItemProperties: [
          { id: 'item', name: 'item', type: 'string', title: 'Item' }
        ]
      };

      // Multiple calls should return same results
      expect(factory.hasChildren(property)).toBe(true);
      expect(factory.hasChildren(property)).toBe(true);
      
      const children1 = factory.getChildren(property);
      const children2 = factory.getChildren(property);
      expect(children1).toEqual(children2);
    });
  });

  describe('Type Selection', () => {
    it('should select correct navigator for each property type', () => {
      const types: PropertyForm['type'][] = ['array', 'object', 'conditional', 'string', 'number', 'boolean', 'enum'];
      
      types.forEach(type => {
        const property: PropertyForm = {
          id: `test-${type}`,
          name: type,
          type,
          title: type,
          required: true
        };

        // Should not throw and should return valid responses
        expect(() => factory.hasChildren(property)).not.toThrow();
        expect(() => factory.getChildren(property)).not.toThrow();
        expect(() => factory.canAddChildren(property)).not.toThrow();
        expect(() => factory.getChildrenCount(property)).not.toThrow();
      });
    });
  });
});
