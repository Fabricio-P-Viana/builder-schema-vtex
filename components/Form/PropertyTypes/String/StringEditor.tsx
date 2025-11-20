'use client'

import { WidgetType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import BasePropertyEditor from '../Shared/BasePropertyEditor';
import { BasePropertyEditorProps } from '../Shared/types';

export default function StringEditor({ property, onChange }: BasePropertyEditorProps) {
  const widgetTypes: WidgetType[] = ['image-uploader', 'datetime', 'textarea', 'color-picker', 'range', 'radio'];

  return (
    <BasePropertyEditor property={property} onChange={onChange}>
      <div>
        <Label>Widget (opcional)</Label>
        <Select
          value={'widget' in property ? property.widget || '' : ''}
          onChange={(e) => onChange('widget', (e.target.value || undefined) as WidgetType)}
        >
          <option value="">Nenhum (input padrão)</option>
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
          value={'format' in property ? property.format || '' : ''}
          onChange={(e) => onChange('format', e.target.value)}
          placeholder="Ex: date-time, uri"
        />
      </div>
    </BasePropertyEditor>
  );
}
