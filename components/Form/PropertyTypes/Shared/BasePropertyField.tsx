'use client'

import { PropertyForm, PropertyType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

interface BasePropertyFieldProps {
  property: PropertyForm;
  onChange: (updatedProperty: PropertyForm) => void;
  onRemove: () => void;
  children?: React.ReactNode;
  showDefaultValue?: boolean;
}

export default function BasePropertyField({ 
  property, 
  onChange, 
  onRemove,
  children,
  showDefaultValue = true
}: BasePropertyFieldProps) {
  const propertyTypes: PropertyType[] = ['string', 'boolean', 'object', 'array', 'number', 'enum', 'conditional'];

  const handleChange = <K extends keyof PropertyForm>(field: K, value: PropertyForm[K]) => {
    const updatedProperty = { ...property, [field]: value };
    
    // Inicializar arrays necessários quando o tipo muda
    if (field === 'type') {
      const newType = value as PropertyType;
      if (newType === 'conditional' && !updatedProperty.conditionalFields) {
        updatedProperty.conditionalFields = [];
      } else if (newType === 'array' && !updatedProperty.arrayItemProperties) {
        updatedProperty.arrayItemProperties = [];
      } else if (newType === 'object' && !updatedProperty.objectProperties) {
        updatedProperty.objectProperties = [];
      }
    }
    
    onChange(updatedProperty);
  };

  return (
    <div className="border border-border rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 bg-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-sm sm:text-base text-foreground">Propriedade</h3>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Remover</span>
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label>Nome da Propriedade *</Label>
          <Input
            type="text"
            value={property.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex: title, images, active"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label>Tipo *</Label>
            <Select
              value={property.type}
              onChange={(e) => handleChange('type', e.target.value as PropertyType)}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label>Título *</Label>
            <Input
              type="text"
              value={property.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ex: Título, Imagens"
            />
          </div>
        </div>

        <div>
          <Label>Descrição</Label>
          <Input
            type="text"
            value={property.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Descrição opcional"
          />
        </div>

        {showDefaultValue && (
          <div>
            <Label>Valor Padrão</Label>
            <Input
              type="text"
              value={property.defaultValue || ''}
              onChange={(e) => handleChange('defaultValue', e.target.value)}
              placeholder={property.type === 'boolean' ? 'true ou false' : 'Valor padrão'}
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
