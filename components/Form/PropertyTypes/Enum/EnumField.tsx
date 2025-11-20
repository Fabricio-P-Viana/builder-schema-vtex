'use client'

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Info } from 'lucide-react';
import BasePropertyField from '../Shared/BasePropertyField';
import { BasePropertyFieldProps } from '../Shared/types';

export default function EnumField({ property, onChange, onRemove }: BasePropertyFieldProps) {
  const handleChange = <K extends keyof typeof property>(field: K, value: typeof property[K]) => {
    onChange({ ...property, [field]: value });
  };

  return (
    <BasePropertyField property={property} onChange={onChange} onRemove={onRemove}>
      <div>
        <Label>
          Enum (valores permitidos, separados por vírgula)
        </Label>
        <Input
          type="text"
          value={property.enumValues || ''}
          onChange={(e) => handleChange('enumValues', e.target.value)}
          placeholder="Ex: red, blue, green"
        />
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Use para criar dropdown com valores específicos
        </p>
      </div>

      <div>
        <Label>
          Enum Names (nomes amigáveis, separados por vírgula)
        </Label>
        <Input
          type="text"
          value={property.enumNames || ''}
          onChange={(e) => handleChange('enumNames', e.target.value)}
          placeholder="Ex: Vermelho, Azul, Verde"
        />
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Opcional: Nomes que aparecem no Site Editor (mesma ordem do enum)
        </p>
      </div>
    </BasePropertyField>
  );
}
