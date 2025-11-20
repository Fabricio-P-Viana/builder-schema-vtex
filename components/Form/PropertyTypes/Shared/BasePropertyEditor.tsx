'use client'

import { PropertyForm, ArrayItemProperty, ConditionalFieldForm, PropertyType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

interface BasePropertyEditorProps {
  property: PropertyForm | ArrayItemProperty | ConditionalFieldForm;
  onChange: (field: string, value: unknown) => void;
  children?: React.ReactNode;
  showDefaultValue?: boolean;
}

export default function BasePropertyEditor({ 
  property, 
  onChange,
  children,
  showDefaultValue = true
}: BasePropertyEditorProps) {
  const propertyTypes: PropertyType[] = ['string', 'boolean', 'object', 'array', 'number', 'enum', 'conditional'];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Nome da Propriedade */}
      <div>
        <Label>Nome da Propriedade *</Label>
        <Input
          type="text"
          value={property.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Ex: title, images, active"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Nome usado no código (camelCase recomendado)
        </p>
      </div>

      {/* Tipo e Título */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Tipo *</Label>
          <Select
            value={property.type}
            onChange={(e) => onChange('type', e.target.value as PropertyType)}
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
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Ex: Título, Imagens"
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <Label>Descrição</Label>
        <Textarea
          value={property.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Descrição opcional que aparece no Site Editor"
          rows={2}
        />
      </div>

      {/* Valor Padrão */}
      {showDefaultValue && (
        <div>
          <Label>Valor Padrão</Label>
          <Input
            type="text"
            value={property.defaultValue || ''}
            onChange={(e) => onChange('defaultValue', e.target.value)}
            placeholder={
              property.type === 'boolean'
                ? 'true ou false'
                : property.type === 'number'
                ? '0'
                : 'Valor padrão'
            }
          />
        </div>
      )}

      {children}
    </div>
  );
}
