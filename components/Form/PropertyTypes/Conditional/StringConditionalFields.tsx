'use client'

import { WidgetType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

interface StringConditionalFieldsProps {
  widget?: WidgetType;
  format?: string;
  onWidgetChange: (widget: WidgetType | undefined) => void;
  onFormatChange: (format: string) => void;
}

export default function StringConditionalFields({ 
  widget, 
  format, 
  onWidgetChange, 
  onFormatChange 
}: StringConditionalFieldsProps) {
  const widgetTypes: WidgetType[] = ['image-uploader', 'datetime', 'textarea', 'color-picker', 'range', 'radio'];

  return (
    <>
      <div>
        <Label className="text-xs font-medium">Widget (opcional)</Label>
        <Select
          value={widget || ''}
          onChange={(e) => onWidgetChange((e.target.value || undefined) as WidgetType)}
          className="h-9 text-sm"
        >
          <option value="">Nenhum (input padrão)</option>
          {widgetTypes.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label className="text-xs font-medium">Formato (opcional)</Label>
        <Input
          type="text"
          value={format || ''}
          onChange={(e) => onFormatChange(e.target.value)}
          placeholder="Ex: date-time, uri"
          className="h-9 text-sm"
        />
      </div>
    </>
  );
}
