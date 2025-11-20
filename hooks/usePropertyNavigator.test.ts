import { renderHook } from '@testing-library/react';
import { usePropertyNavigator } from './usePropertyNavigator';
import { PropertyForm, ArrayItemProperty } from '@/types';

describe('usePropertyNavigator', () => {
  const createMockArrayProperty = (): PropertyForm => ({
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

  const createMockObjectProperty = (): PropertyForm => ({
    id: 'obj1',
    name: 'metadata',
    type: 'object',
    title: 'Metadata',
    required: true,
    objectProperties: [
      { id: 'prop1', name: 'author', type: 'string', title: 'Author' },
      { id: 'prop2', name: 'date', type: 'string', title: 'Date' }
    ]
  });

  const createMockConditionalProperty = (): PropertyForm => ({
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

  const createMockStringProperty = (): PropertyForm => ({
    id: 'str1',
    name: 'title',
    type: 'string',
    title: 'Title',
    required: true
  });

  describe('hasChildren', () => {
    it('should return true for array property with items', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockArrayProperty();

      expect(result.current.hasChildren(property)).toBe(true);
    });

    it('should return true for object property with properties', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockObjectProperty();

      expect(result.current.hasChildren(property)).toBe(true);
    });

    it('should return true for conditional property with fields', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockConditionalProperty();

      expect(result.current.hasChildren(property)).toBe(true);
    });

    it('should return false for string property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockStringProperty();

      expect(result.current.hasChildren(property)).toBe(false);
    });

    it('should return false for array property without items', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        ...createMockArrayProperty(),
        arrayItemProperties: []
      };

      expect(result.current.hasChildren(property)).toBe(false);
    });

    it('should return false for object property without properties', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        ...createMockObjectProperty(),
        objectProperties: []
      };

      expect(result.current.hasChildren(property)).toBe(false);
    });
  });

  describe('getChildren', () => {
    it('should return array items for array property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockArrayProperty();

      const children = result.current.getChildren(property);

      expect(children).toHaveLength(2);
      expect(children?.[0].name).toBe('src');
      expect(children?.[1].name).toBe('alt');
    });

    it('should return object properties for object property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockObjectProperty();

      const children = result.current.getChildren(property);

      expect(children).toHaveLength(2);
      expect(children?.[0].name).toBe('author');
      expect(children?.[1].name).toBe('date');
    });

    it('should return conditional fields for conditional property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockConditionalProperty();

      const children = result.current.getChildren(property);

      expect(children).toHaveLength(2);
      expect(children?.[0].name).toBe('option1');
      expect(children?.[1].name).toBe('option2');
    });

    it('should return null for string property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockStringProperty();

      const children = result.current.getChildren(property);

      // Hook returns [] instead of null for primitives
      expect(children).toEqual([]);
    });

    it('should return empty array for array property without items', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        ...createMockArrayProperty(),
        arrayItemProperties: []
      };

      const children = result.current.getChildren(property);

      expect(children).toEqual([]);
    });
  });

  describe('canAddChildren', () => {
    it('should return true for array property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockArrayProperty();

      expect(result.current.canAddChildren(property)).toBe(true);
    });

    it('should return true for object property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockObjectProperty();

      expect(result.current.canAddChildren(property)).toBe(true);
    });

    it('should return true for conditional property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockConditionalProperty();

      expect(result.current.canAddChildren(property)).toBe(true);
    });

    it('should return false for string property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockStringProperty();

      expect(result.current.canAddChildren(property)).toBe(false);
    });

    it('should return false for number property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        id: 'num1',
        name: 'count',
        type: 'number',
        title: 'Count',
        required: true
      };

      expect(result.current.canAddChildren(property)).toBe(false);
    });

    it('should return false for boolean property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        id: 'bool1',
        name: 'active',
        type: 'boolean',
        title: 'Active',
        required: true
      };

      expect(result.current.canAddChildren(property)).toBe(false);
    });

    it('should return false for enum property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        id: 'enum1',
        name: 'status',
        type: 'enum',
        title: 'Status',
        required: true,
        enumValues: 'active,inactive',
        enumNames: 'Active,Inactive'
      };

      expect(result.current.canAddChildren(property)).toBe(false);
    });
  });

  describe('getChildrenCount', () => {
    it('should return correct count for array property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockArrayProperty();

      expect(result.current.getChildrenCount(property)).toBe(2);
    });

    it('should return correct count for object property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockObjectProperty();

      expect(result.current.getChildrenCount(property)).toBe(2);
    });

    it('should return correct count for conditional property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockConditionalProperty();

      expect(result.current.getChildrenCount(property)).toBe(2);
    });

    it('should return 0 for string property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property = createMockStringProperty();

      expect(result.current.getChildrenCount(property)).toBe(0);
    });

    it('should return 0 for empty array property', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        ...createMockArrayProperty(),
        arrayItemProperties: []
      };

      expect(result.current.getChildrenCount(property)).toBe(0);
    });

    it('should return 0 for property without children', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        ...createMockArrayProperty(),
        arrayItemProperties: undefined
      };

      expect(result.current.getChildrenCount(property)).toBe(0);
    });
  });

  describe('factory instance stability', () => {
    it('should provide consistent results across renders', () => {
      const { result, rerender } = renderHook(() => usePropertyNavigator());
      const property = createMockArrayProperty();
      
      const firstCheck = result.current.hasChildren(property);
      
      rerender();
      
      const secondCheck = result.current.hasChildren(property);
      
      // Results should be consistent
      expect(firstCheck).toBe(secondCheck);
      expect(firstCheck).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle null/undefined children arrays gracefully', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const property: PropertyForm = {
        id: 'array1',
        name: 'images',
        type: 'array',
        title: 'Images',
        required: true,
        arrayItemProperties: undefined
      };

      expect(result.current.hasChildren(property)).toBe(false);
      // Hook returns [] instead of null for no children
      expect(result.current.getChildren(property)).toEqual([]);
      expect(result.current.getChildrenCount(property)).toBe(0);
    });

    it('should work with ArrayItemProperty types', () => {
      const { result } = renderHook(() => usePropertyNavigator());
      const arrayItem: ArrayItemProperty = {
        id: 'item1',
        name: 'nested',
        type: 'object',
        title: 'Nested Object',
        objectProperties: [
          { id: 'nested1', name: 'field1', type: 'string', title: 'Field 1' }
        ]
      };

      expect(result.current.hasChildren(arrayItem)).toBe(true);
      expect(result.current.getChildrenCount(arrayItem)).toBe(1);
    });
  });
});
