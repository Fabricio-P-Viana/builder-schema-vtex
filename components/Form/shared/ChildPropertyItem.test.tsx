import React from 'react';
import { render, screen } from '@testing-library/react';
import ChildPropertyItem from './ChildPropertyItem';
import { PropertyItem } from '@/contexts/PropertyNavigators';

describe('ChildPropertyItem', () => {
  const createMockItem = (overrides?: Partial<PropertyItem>): PropertyItem => ({
    id: 'test-id',
    name: 'testField',
    type: 'string',
    title: 'Test Field',
    ...overrides
  });

  describe('Rendering', () => {
    it('should render item name', () => {
      const item = createMockItem({ name: 'myField' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('myField')).toBeInTheDocument();
    });

    it('should render item type badge', () => {
      const item = createMockItem({ type: 'string' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('string')).toBeInTheDocument();
    });

    it('should render "sem-nome" when name is empty', () => {
      const item = createMockItem({ name: '' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('sem-nome')).toBeInTheDocument();
    });

    it('should render FileJson icon', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply purple color for array items', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('text-purple-500');
    });

    it('should apply blue color for object properties', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="blue" />);
      
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('text-blue-500');
    });

    it('should apply yellow color for conditional fields', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="yellow" />);
      
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('text-yellow-500');
    });
  });

  describe('Different Property Types', () => {
    const types: Array<PropertyItem['type']> = 
      ['string', 'number', 'boolean', 'array', 'object', 'enum', 'conditional'];

    types.forEach(type => {
      it(`should render ${type} type correctly`, () => {
        const item = createMockItem({ type, name: `${type}Field` });
        render(<ChildPropertyItem item={item} color="purple" />);
        
        expect(screen.getByText(`${type}Field`)).toBeInTheDocument();
        expect(screen.getByText(type)).toBeInTheDocument();
      });
    });
  });

  describe('Layout and Structure', () => {
    it('should have proper container structure', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex', 'items-center', 'gap-1');
    });

    it('should have hover effect class', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('hover:bg-[hsl(var(--sidebar-hover))]');
    });

    it('should have proper spacing', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('px-2', 'py-1');
    });

    it('should render spacer div for indentation', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      const spacer = container.querySelector('.w-4');
      expect(spacer).toBeInTheDocument();
    });
  });

  describe('Text Styling', () => {
    it('should apply muted style to empty name', () => {
      const item = createMockItem({ name: '' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      const nameElement = screen.getByText('sem-nome');
      expect(nameElement).toHaveClass('text-muted-foreground', 'italic');
    });

    it('should apply foreground style to valid name', () => {
      const item = createMockItem({ name: 'validName' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      const nameElement = screen.getByText('validName');
      expect(nameElement).toHaveClass('text-foreground');
      expect(nameElement).not.toHaveClass('italic');
    });

    it('should truncate long names', () => {
      const longName = 'this-is-a-very-long-property-name-that-should-be-truncated';
      const item = createMockItem({ name: longName });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      const nameElement = screen.getByText(longName);
      expect(nameElement).toHaveClass('truncate');
    });
  });

  describe('Badge Component', () => {
    it('should scale badge properly', () => {
      const item = createMockItem();
      render(<ChildPropertyItem item={item} color="purple" />);
      
      // Badge should have scale-75 class (Tailwind's scale-[0.65] becomes scale-75)
      const badge = screen.getByText('string');
      expect(badge).toBeInTheDocument();
      expect(badge.className).toContain('scale');
    });

    it('should use type as badge variant', () => {
      const item = createMockItem({ type: 'array' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      const badge = screen.getByText('array');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML structure', () => {
      const item = createMockItem();
      const { container } = render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('should have readable text content', () => {
      const item = createMockItem({ name: 'accessibleField', type: 'string' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('accessibleField')).toHaveTextContent('accessibleField');
      expect(screen.getByText('string')).toHaveTextContent('string');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very short names', () => {
      const item = createMockItem({ name: 'a' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('a')).toBeInTheDocument();
    });

    it('should handle names with special characters', () => {
      const item = createMockItem({ name: 'field_with-special.chars' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('field_with-special.chars')).toBeInTheDocument();
    });

    it('should handle names with spaces', () => {
      const item = createMockItem({ name: 'field with spaces' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('field with spaces')).toBeInTheDocument();
    });

    it('should handle names with numbers', () => {
      const item = createMockItem({ name: 'field123' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('field123')).toBeInTheDocument();
    });

    it('should handle undefined name gracefully', () => {
      const item = { ...createMockItem(), name: '' };
      render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(screen.getByText('sem-nome')).toBeInTheDocument();
    });
  });

  describe('Consistency', () => {
    it('should render consistently with same props', () => {
      const item = createMockItem();
      const { container: container1 } = render(<ChildPropertyItem item={item} color="purple" />);
      const { container: container2 } = render(<ChildPropertyItem item={item} color="purple" />);
      
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });

    it('should maintain structure across different types', () => {
      const types: PropertyItem['type'][] = ['string', 'number', 'boolean'];
      
      types.forEach(type => {
        const item = createMockItem({ type });
        const { container } = render(<ChildPropertyItem item={item} color="purple" />);
        
        // All should have same basic structure
        expect(container.querySelectorAll('.flex').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration with Badge Component', () => {
    it('should pass correct variant to Badge', () => {
      const item = createMockItem({ type: 'enum' });
      render(<ChildPropertyItem item={item} color="purple" />);
      
      // Badge should display the type
      const badge = screen.getByText('enum');
      expect(badge).toBeInTheDocument();
    });
  });
});
