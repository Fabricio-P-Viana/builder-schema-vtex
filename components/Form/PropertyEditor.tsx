'use client'

import { FileJson } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { usePropertyContext } from '@/contexts/PropertyContext';
import { PropertyEditorFactory } from './PropertyTypes';

export default function PropertyEditor() {
  const { selectedPath, getPropertyByPath, updatePropertyByPath } = usePropertyContext();
  
  if (!selectedPath) {
    return null;
  }
  
  const property = getPropertyByPath(selectedPath);
  
  if (!property) {
    return null;
  }
  
  const isRootLevel = selectedPath.length === 1;

  const handleChange = (field: string, value: unknown) => {
    const updatedProperty: Record<string, unknown> = { ...property, [field]: value };
    
    // Inicializar arrays necessários quando o tipo muda
    if (field === 'type') {
      const newType = value as string;
      if (newType === 'conditional' && !('conditionalFields' in updatedProperty)) {
        updatedProperty.conditionalFields = [];
      } else if (newType === 'array' && !('arrayItemProperties' in updatedProperty)) {
        updatedProperty.arrayItemProperties = [];
      } else if (newType === 'object' && !('objectProperties' in updatedProperty)) {
        updatedProperty.objectProperties = [];
      }
    }
    
    updatePropertyByPath(selectedPath, updatedProperty as typeof property);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3 mb-2">
          <FileJson className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">
              {property.name || 'Nova Propriedade'}
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              {selectedPath.join(' > ')}
            </p>
          </div>
          <Badge variant={property.type as never}>{property.type}</Badge>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <PropertyEditorFactory property={property} onChange={handleChange} />

        {/* Campo Required apenas para propriedades raiz */}
        {isRootLevel && 'required' in property && (
          <div className="max-w-2xl mx-auto border-t border-border pt-4 mt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={property.required || false}
                onChange={(e) => handleChange('required', e.target.checked)}
                className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
              />
              Campo obrigatório
            </label>
            <p className="text-xs text-muted-foreground mt-1 ml-6">
              Define se este campo é obrigatório no formulário
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
