'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { PropertyForm, ArrayItemProperty, ConditionalFieldForm } from '@/types';
import { PropertyNavigatorFactory, PropertyItem } from './PropertyNavigators';

interface PropertyContextType {
  properties: PropertyForm[];
  selectedPath: string[] | null;
  componentTitle: string;
  
  // Operações
  setComponentTitle: (title: string) => void;
  setSelectedPath: (path: string[] | null) => void;
  getPropertyByPath: (path: string[]) => PropertyForm | ArrayItemProperty | ConditionalFieldForm | null;
  updatePropertyByPath: (path: string[], updatedProperty: PropertyForm | ArrayItemProperty | ConditionalFieldForm) => void;
  addProperty: (parentPath: string[] | null) => void;
  removeProperty: (path: string[]) => void;
  setProperties: (properties: PropertyForm[]) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<PropertyForm[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[] | null>(null);
  const [componentTitle, setComponentTitle] = useState('Custom Component');

  const navigatorFactory = useMemo(() => new PropertyNavigatorFactory(), []);

  // Função para obter propriedade pelo caminho
  const getPropertyByPath = useCallback((path: string[]): PropertyForm | ArrayItemProperty | ConditionalFieldForm | null => {
    if (path.length === 0) return null;
    
    let current: PropertyItem = properties[parseInt(path[0])];
    
    for (let i = 1; i < path.length; i++) {
      const children = navigatorFactory.getChildren(current);
      if (!children) return null;
      current = children[parseInt(path[i])];
    }
    
    return current;
  }, [properties, navigatorFactory]);

  // Função para atualizar propriedade pelo caminho
  const updatePropertyByPath = useCallback((
    path: string[], 
    updatedProperty: PropertyForm | ArrayItemProperty | ConditionalFieldForm
  ) => {
    const newProperties = [...properties];
    
    if (path.length === 1) {
      newProperties[parseInt(path[0])] = updatedProperty as PropertyForm;
      setProperties(newProperties);
      return;
    }

    const updateNested = (
      items: PropertyItem[],
      pathIndex: number
    ): PropertyItem[] => {
      return items.map((item, index) => {
        if (index !== parseInt(path[pathIndex])) return item;
        
        if (pathIndex === path.length - 1) {
          return updatedProperty;
        }
        
        const children = navigatorFactory.getChildren(item);
        if (!children) return item;
        
        const updatedChildren = updateNested(children, pathIndex + 1);
        return navigatorFactory.setChildren(item, updatedChildren);
      });
    };
    
    const updated = updateNested(newProperties, 0);
    setProperties(updated as PropertyForm[]);
  }, [properties, navigatorFactory]);

  // Função para adicionar propriedade
  const addProperty = useCallback((parentPath: string[] | null) => {
    setProperties((currentProperties) => {
      const newProperty: ArrayItemProperty = {
        id: Date.now().toString(),
        name: '',
        type: 'string',
        title: '',
        description: '',
        defaultValue: '',
      };

      if (parentPath === null) {
        // Adicionar no nível raiz
        const newRootProperty: PropertyForm = {
          ...newProperty,
          required: false,
        };
        setSelectedPath([currentProperties.length.toString()]);
        return [...currentProperties, newRootProperty];
      }

      // Adicionar como filho
      const getParentFromCurrent = (path: string[]): PropertyItem | null => {
        if (path.length === 0) return null;
        
        let current: PropertyItem = currentProperties[parseInt(path[0])];
        
        for (let i = 1; i < path.length; i++) {
          const children = navigatorFactory.getChildren(current);
          if (!children) return null;
          current = children[parseInt(path[i])];
        }
        
        return current;
      };

      const parentItem = getParentFromCurrent(parentPath);
      if (!parentItem) return currentProperties;
      
      const newProperties = [...currentProperties];
      
      const addToParent = (
        items: PropertyItem[],
        pathIndex: number
      ): PropertyItem[] => {
        return items.map((item, index) => {
          if (index !== parseInt(parentPath[pathIndex])) return item;
          
          if (pathIndex === parentPath.length - 1) {
            return navigatorFactory.addChild(item, newProperty);
          }
          
          const children = navigatorFactory.getChildren(item);
          if (!children) return item;
          
          const updatedChildren = addToParent(children, pathIndex + 1);
          return navigatorFactory.setChildren(item, updatedChildren);
        });
      };
      
      const updated = addToParent(newProperties, 0);
      
      // Selecionar o novo item
      const newIndex = navigatorFactory.getChildrenCount(parentItem);
      setSelectedPath([...parentPath, newIndex.toString()]);
      
      return updated as PropertyForm[];
    });
  }, [navigatorFactory]);

  // Função para remover propriedade
  const removeProperty = useCallback((path: string[]) => {
    if (path.length === 1) {
      const newProperties = properties.filter((_, index) => index !== parseInt(path[0]));
      setProperties(newProperties);
      setSelectedPath(null);
      return;
    }

    const newProperties = [...properties];
    
    const removeNested = (
      items: PropertyItem[],
      pathIndex: number
    ): PropertyItem[] => {
      return items.map((item, index) => {
        if (index !== parseInt(path[pathIndex])) return item;
        
        if (pathIndex === path.length - 2) {
          const removeIndex = parseInt(path[path.length - 1]);
          return navigatorFactory.removeChild(item, removeIndex);
        }
        
        const children = navigatorFactory.getChildren(item);
        if (!children) return item;
        
        const updatedChildren = removeNested(children, pathIndex + 1);
        return navigatorFactory.setChildren(item, updatedChildren);
      });
    };
    
    const updated = removeNested(newProperties, 0);
    setProperties(updated as PropertyForm[]);
    setSelectedPath(null);
  }, [properties, navigatorFactory]);

  const value: PropertyContextType = {
    properties,
    selectedPath,
    componentTitle,
    setComponentTitle,
    setSelectedPath,
    getPropertyByPath,
    updatePropertyByPath,
    addProperty,
    removeProperty,
    setProperties,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext deve ser usado dentro de um PropertyProvider');
  }
  return context;
}
