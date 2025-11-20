import { PropertyForm, ArrayItemProperty, ConditionalFieldForm } from '@/types';
import { PropertyNavigatorFactory, PropertyItem } from '@/contexts/PropertyNavigators';
import { useMemo } from 'react';

/**
 * Hook que fornece utilidades para trabalhar com propriedades usando navegadores
 */
export function usePropertyNavigator() {
  const navigatorFactory = useMemo(() => new PropertyNavigatorFactory(), []);

  const hasChildren = (item: PropertyItem): boolean => {
    const children = navigatorFactory.getChildren(item);
    return !!(children && children.length > 0);
  };

  const getChildren = (item: PropertyItem): PropertyItem[] => {
    return navigatorFactory.getChildren(item) || [];
  };

  const canAddChildren = (item: PropertyItem): boolean => {
    return item.type === 'array' || item.type === 'object' || item.type === 'conditional';
  };

  const getChildrenCount = (item: PropertyItem): number => {
    return navigatorFactory.getChildrenCount(item);
  };

  return {
    navigatorFactory,
    hasChildren,
    getChildren,
    canAddChildren,
    getChildrenCount
  };
}
