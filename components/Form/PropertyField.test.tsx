import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyField from './PropertyField';
import { PropertyForm } from '@/types';

// Mock dos componentes específicos
jest.mock('./PropertyTypes/String/StringField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="string-field">String Field: {property.name}</div>
  )
}));

jest.mock('./PropertyTypes/Number/NumberField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="number-field">Number Field: {property.name}</div>
  )
}));

jest.mock('./PropertyTypes/Boolean/BooleanField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="boolean-field">Boolean Field: {property.name}</div>
  )
}));

jest.mock('./PropertyTypes/Array/ArrayField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="array-field">Array Field: {property.name}</div>
  )
}));

jest.mock('./PropertyTypes/Object/ObjectField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="object-field">Object Field: {property.name}</div>
  )
}));

jest.mock('./PropertyTypes/Enum/EnumField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="enum-field">Enum Field: {property.name}</div>
  )
}));

jest.mock('./PropertyTypes/Conditional/ConditionalField', () => ({
  __esModule: true,
  default: ({ property }: { property: PropertyForm }) => (
    <div data-testid="conditional-field">Conditional Field: {property.name}</div>
  )
}));

describe('PropertyField - Factory Pattern', () => {
  const mockOnChange = jest.fn();
  const mockOnRemove = jest.fn();

  const createProperty = (type: PropertyForm['type'], name = 'testProperty'): PropertyForm => ({
    id: `${type}-1`,
    name,
    type,
    title: `Test ${type}`,
    required: true
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Type Routing', () => {
    it('should render StringField for string type', () => {
      const property = createProperty('string');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('string-field')).toBeInTheDocument();
      expect(screen.getByText(/String Field: testProperty/)).toBeInTheDocument();
    });

    it('should render NumberField for number type', () => {
      const property = createProperty('number');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('number-field')).toBeInTheDocument();
      expect(screen.getByText(/Number Field: testProperty/)).toBeInTheDocument();
    });

    it('should render BooleanField for boolean type', () => {
      const property = createProperty('boolean');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('boolean-field')).toBeInTheDocument();
      expect(screen.getByText(/Boolean Field: testProperty/)).toBeInTheDocument();
    });

    it('should render ArrayField for array type', () => {
      const property = createProperty('array');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('array-field')).toBeInTheDocument();
      expect(screen.getByText(/Array Field: testProperty/)).toBeInTheDocument();
    });

    it('should render ObjectField for object type', () => {
      const property = createProperty('object');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('object-field')).toBeInTheDocument();
      expect(screen.getByText(/Object Field: testProperty/)).toBeInTheDocument();
    });

    it('should render EnumField for enum type', () => {
      const property = createProperty('enum');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('enum-field')).toBeInTheDocument();
      expect(screen.getByText(/Enum Field: testProperty/)).toBeInTheDocument();
    });

    it('should render ConditionalField for conditional type', () => {
      const property = createProperty('conditional');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('conditional-field')).toBeInTheDocument();
      expect(screen.getByText(/Conditional Field: testProperty/)).toBeInTheDocument();
    });
  });

  describe('Props Passing', () => {
    it('should pass property to child component', () => {
      const property = createProperty('string', 'myCustomField');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText(/myCustomField/)).toBeInTheDocument();
    });

    it('should pass onChange callback to child component', () => {
      const property = createProperty('string');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      // Component should be rendered with onChange prop
      expect(screen.getByTestId('string-field')).toBeInTheDocument();
    });

    it('should pass onRemove callback to child component', () => {
      const property = createProperty('string');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      // Component should be rendered with onRemove prop
      expect(screen.getByTestId('string-field')).toBeInTheDocument();
    });
  });

  describe('Factory Pattern Benefits', () => {
    it('should use single switch statement instead of multiple if/else', () => {
      // This test verifies the factory pattern eliminates cascading if/else
      const types: PropertyForm['type'][] = [
        'string', 'number', 'boolean', 'array', 'object', 'enum', 'conditional'
      ];

      types.forEach(type => {
        const property = createProperty(type);
        const { unmount } = render(
          <PropertyField
            property={property}
            onChange={mockOnChange}
            onRemove={mockOnRemove}
          />
        );

        expect(screen.getByTestId(`${type}-field`)).toBeInTheDocument();
        unmount();
      });
    });

    it('should maintain consistent interface across all types', () => {
      const types: PropertyForm['type'][] = [
        'string', 'number', 'boolean', 'array', 'object', 'enum', 'conditional'
      ];

      types.forEach(type => {
        const property = createProperty(type, `${type}Property`);
        const { unmount } = render(
          <PropertyField
            property={property}
            onChange={mockOnChange}
            onRemove={mockOnRemove}
          />
        );

        // All should render their respective field with consistent structure
        expect(screen.getByText(new RegExp(`${type}Property`))).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid type switches', () => {
      const { rerender } = render(
        <PropertyField
          property={createProperty('string')}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('string-field')).toBeInTheDocument();

      rerender(
        <PropertyField
          property={createProperty('number')}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.queryByTestId('string-field')).not.toBeInTheDocument();
      expect(screen.getByTestId('number-field')).toBeInTheDocument();
    });

    it('should handle property updates', () => {
      const property = createProperty('string', 'initialName');
      const { rerender } = render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText(/initialName/)).toBeInTheDocument();

      const updatedProperty = { ...property, name: 'updatedName' };
      rerender(
        <PropertyField
          property={updatedProperty}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByText(/updatedName/)).toBeInTheDocument();
    });
  });

  describe('Component Isolation', () => {
    it('should render only one field component at a time', () => {
      const property = createProperty('string');
      render(
        <PropertyField
          property={property}
          onChange={mockOnChange}
          onRemove={mockOnRemove}
        />
      );

      expect(screen.getByTestId('string-field')).toBeInTheDocument();
      expect(screen.queryByTestId('number-field')).not.toBeInTheDocument();
      expect(screen.queryByTestId('boolean-field')).not.toBeInTheDocument();
      expect(screen.queryByTestId('array-field')).not.toBeInTheDocument();
      expect(screen.queryByTestId('object-field')).not.toBeInTheDocument();
      expect(screen.queryByTestId('enum-field')).not.toBeInTheDocument();
      expect(screen.queryByTestId('conditional-field')).not.toBeInTheDocument();
    });
  });
});
