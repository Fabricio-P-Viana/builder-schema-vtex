'use client'

import { WidgetType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import BasePropertyField from '../Shared/BasePropertyField';
import { BasePropertyFieldProps } from '../Shared/types';

export default function StringField({ property, onChange, onRemove }: BasePropertyFieldProps) {
  const widgetTypes: WidgetType[] = ['image-uploader', 'datetime', 'textarea', 'color-picker', 'range'];

  const handleChange = <K extends keyof typeof property>(field: K, value: typeof property[K]) => {
    onChange({ ...property, [field]: value });
  };

  return (
    <BasePropertyField property={property} onChange={onChange} onRemove={onRemove}>
      <div>
        <Label>Widget (opcional)</Label>
        <Select
          value={property.widget || ''}
          onChange={(e) =>
            handleChange('widget', (e.target.value || undefined) as typeof property.widget)
          }
        >
          <option value="">Nenhum</option>
          {widgetTypes.map((widget) => (
            <option key={widget} value={widget}>
              {widget}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Formato (opcional)</Label>
        <Input
          type="text"
          value={property.format || ''}
          onChange={(e) => handleChange('format', e.target.value)}
          placeholder="Ex: date-time"
        />
      </div>
    </BasePropertyField>
  );
}
