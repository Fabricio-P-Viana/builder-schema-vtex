import { renderHook, act } from '@testing-library/react';
import { useExpandable } from './useExpandable';

describe('useExpandable', () => {
  describe('toggle', () => {
    it('should expand an item when toggled for the first time', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        const mockEvent = { stopPropagation: jest.fn() } as unknown as React.MouseEvent;
        result.current.toggle('item1', mockEvent);
      });

      expect(result.current.isExpanded('item1')).toBe(true);
    });

    it('should collapse an item when toggled twice', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        const mockEvent = { stopPropagation: jest.fn() } as unknown as React.MouseEvent;
        result.current.toggle('item1', mockEvent);
        result.current.toggle('item1', mockEvent);
      });

      expect(result.current.isExpanded('item1')).toBe(false);
    });

    it('should stop event propagation when toggling', () => {
      const { result } = renderHook(() => useExpandable<string>());
      const mockEvent = { stopPropagation: jest.fn() } as unknown as React.MouseEvent;

      act(() => {
        result.current.toggle('item1', mockEvent);
      });

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should handle multiple items independently', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        const mockEvent = { stopPropagation: jest.fn() } as unknown as React.MouseEvent;
        result.current.toggle('item1', mockEvent);
        result.current.toggle('item2', mockEvent);
      });

      expect(result.current.isExpanded('item1')).toBe(true);
      expect(result.current.isExpanded('item2')).toBe(true);
      expect(result.current.isExpanded('item3')).toBe(false);
    });
  });

  describe('isExpanded', () => {
    it('should return false for items that have not been expanded', () => {
      const { result } = renderHook(() => useExpandable<string>());

      expect(result.current.isExpanded('nonexistent')).toBe(false);
    });

    it('should return true for expanded items', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        const mockEvent = { stopPropagation: jest.fn() } as unknown as React.MouseEvent;
        result.current.toggle('item1', mockEvent);
      });

      expect(result.current.isExpanded('item1')).toBe(true);
    });
  });

  describe('expand', () => {
    it('should expand a single item', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expand('item1');
      });

      expect(result.current.isExpanded('item1')).toBe(true);
    });

    it('should not affect already expanded items', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expand('item1');
        result.current.expand('item1');
      });

      expect(result.current.isExpanded('item1')).toBe(true);
    });
  });

  describe('collapse', () => {
    it('should collapse an expanded item', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expand('item1');
        result.current.collapse('item1');
      });

      expect(result.current.isExpanded('item1')).toBe(false);
    });

    it('should not affect non-expanded items', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.collapse('item1');
      });

      expect(result.current.isExpanded('item1')).toBe(false);
    });
  });

  describe('expandAll', () => {
    it('should expand all provided items', () => {
      const { result } = renderHook(() => useExpandable<string>());
      const items = ['item1', 'item2', 'item3'];

      act(() => {
        result.current.expandAll(items);
      });

      items.forEach(item => {
        expect(result.current.isExpanded(item)).toBe(true);
      });
    });

    it('should preserve previously expanded items not in the list', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expand('item0');
        result.current.expandAll(['item1', 'item2']);
      });

      expect(result.current.isExpanded('item0')).toBe(true);
      expect(result.current.isExpanded('item1')).toBe(true);
      expect(result.current.isExpanded('item2')).toBe(true);
    });

    it('should handle empty array', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expandAll([]);
      });

      // Should not throw and state should remain empty
      expect(result.current.isExpanded('any')).toBe(false);
    });
  });

  describe('collapseAll', () => {
    it('should collapse all expanded items', () => {
      const { result } = renderHook(() => useExpandable<string>());
      const items = ['item1', 'item2', 'item3'];

      act(() => {
        result.current.expandAll(items);
        result.current.collapseAll();
      });

      items.forEach(item => {
        expect(result.current.isExpanded(item)).toBe(false);
      });
    });

    it('should clear all expanded state', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expandAll(['item0', 'item1', 'item2']);
        result.current.collapseAll();
      });

      expect(result.current.isExpanded('item0')).toBe(false);
      expect(result.current.isExpanded('item1')).toBe(false);
      expect(result.current.isExpanded('item2')).toBe(false);
    });

    it('should work on empty state without errors', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.collapseAll();
      });

      // Should not throw and state should remain empty
      expect(result.current.isExpanded('any')).toBe(false);
    });
  });

  describe('generic type support', () => {
    it('should work with number IDs', () => {
      const { result } = renderHook(() => useExpandable<number>());

      act(() => {
        result.current.expand(1);
        result.current.expand(2);
      });

      expect(result.current.isExpanded(1)).toBe(true);
      expect(result.current.isExpanded(2)).toBe(true);
      expect(result.current.isExpanded(3)).toBe(false);
    });

    it('should work with complex object IDs', () => {
      interface ComplexId {
        section: string;
        index: number;
      }

      const { result } = renderHook(() => useExpandable<ComplexId>());
      const id1: ComplexId = { section: 'A', index: 1 };
      const id2: ComplexId = { section: 'A', index: 1 }; // Same values

      act(() => {
        result.current.expand(id1);
      });

      // Note: This will be false because objects are compared by reference
      // This is expected behavior - users should use stable references or string IDs
      expect(result.current.isExpanded(id2)).toBe(false);
      expect(result.current.isExpanded(id1)).toBe(true);
    });
  });

  describe('state persistence', () => {
    it('should maintain state across multiple operations', () => {
      const { result } = renderHook(() => useExpandable<string>());

      act(() => {
        result.current.expand('item1');
        result.current.expand('item2');
        result.current.collapse('item1');
        result.current.expand('item3');
      });

      expect(result.current.isExpanded('item1')).toBe(false);
      expect(result.current.isExpanded('item2')).toBe(true);
      expect(result.current.isExpanded('item3')).toBe(true);
    });
  });
});
