'use client'

import { Label } from '@/components/ui/Label';
import { Info } from 'lucide-react';
import ArrayItemConfig from '../../ArrayItemConfig/index';
import BasePropertyField from '../Shared/BasePropertyField';
import { BasePropertyFieldProps } from '../Shared/types';

export default function ObjectField({ property, onChange, onRemove }: BasePropertyFieldProps) {
  const handleChange = <K extends keyof typeof property>(field: K, value: typeof property[K]) => {
    onChange({ ...property, [field]: value });
  };

  return (
    <BasePropertyField property={property} onChange={onChange} onRemove={onRemove}>
      <div className="border-t border-border pt-3">
        <Label>Propriedades do Objeto</Label>
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Configure as propriedades que farão parte deste objeto
        </p>
      </div>

      <ArrayItemConfig
        properties={property.objectProperties || []}
        onChange={(props) => handleChange('objectProperties', props)}
      />
    </BasePropertyField>
  );
}
