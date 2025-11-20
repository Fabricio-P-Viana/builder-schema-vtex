import { ArrayItemProperty, WidgetType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

interface StringFieldsProps {
  property: ArrayItemProperty;
  widgetTypes: WidgetType[];
  onUpdate: (field: string, value: string | undefined) => void;
}

export function StringFields({ property, widgetTypes, onUpdate }: StringFieldsProps) {
  if (property.type !== 'string') return null;

  return (
    <>
      <div>
        <Label className="text-xs">Widget</Label>
        <Select
          value={property.widget || ''}
          onChange={(e) => onUpdate('widget', e.target.value || undefined)}
          className="h-8 text-sm"
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
        <Label className="text-xs">Formato</Label>
        <Input
          type="text"
          value={property.format || ''}
          onChange={(e) => onUpdate('format', e.target.value)}
          placeholder="Ex: date-time"
          className="h-8 text-sm"
        />
      </div>
    </>
  );
}
