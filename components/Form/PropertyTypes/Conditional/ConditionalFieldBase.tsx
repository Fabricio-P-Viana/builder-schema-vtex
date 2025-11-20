'use client'

import { ConditionalField, PropertyType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

interface ConditionalFieldBaseProps {
  field: ConditionalField;
  onChange: <K extends keyof ConditionalField>(key: K, value: ConditionalField[K]) => void;
}

export default function ConditionalFieldBase({ field, onChange }: ConditionalFieldBaseProps) {
  const propertyTypes: PropertyType[] = ['string', 'boolean', 'number', 'enum'];

  return (
    <>
      {/* Nome e Tipo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-medium">Nome da Propriedade *</Label>
          <Input
            type="text"
            value={field.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Ex: idPromotion"
            className="h-9 text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Nome usado no código (camelCase)
          </p>
        </div>

        <div>
          <Label className="text-xs font-medium">Tipo *</Label>
          <Select
            value={field.type}
            onChange={(e) => onChange('type', e.target.value as PropertyType)}
            className="h-9 text-sm"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Título */}
      <div>
        <Label className="text-xs font-medium">Título *</Label>
        <Input
          type="text"
          value={field.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Ex: ID da promoção"
          className="h-9 text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Nome exibido no Site Editor
        </p>
      </div>

      {/* Descrição */}
      <div>
        <Label className="text-xs font-medium">Descrição (opcional)</Label>
        <Textarea
          value={field.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Descrição que aparece no Site Editor"
          className="text-sm resize-none"
          rows={2}
        />
      </div>

      {/* Valor Padrão */}
      <div>
        <Label className="text-xs font-medium">Valor Padrão (opcional)</Label>
        <Input
          type="text"
          value={field.defaultValue || ''}
          onChange={(e) => onChange('defaultValue', e.target.value)}
          placeholder={
            field.type === 'boolean' 
              ? 'true ou false' 
              : field.type === 'number' 
              ? '0' 
              : 'Valor padrão'
          }
          className="h-9 text-sm"
        />
      </div>
    </>
  );
}
