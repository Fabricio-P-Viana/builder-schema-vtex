import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar estado de itens expandidos/colapsados em uma árvore
 */
export function useExpandable<T = string>() {
  const [expanded, setExpanded] = useState<Set<T>>(new Set());

  const toggle = useCallback((id: T, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isExpanded = useCallback((id: T) => expanded.has(id), [expanded]);

  const expand = useCallback((id: T) => {
    setExpanded(prev => new Set(prev).add(id));
  }, []);

  const collapse = useCallback((id: T) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const expandAll = useCallback((ids: T[]) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      ids.forEach(id => newSet.add(id));
      return newSet;
    });
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded(new Set());
  }, []);

  return {
    expanded,
    toggle,
    isExpanded,
    expand,
    collapse,
    expandAll,
    collapseAll
  };
}
