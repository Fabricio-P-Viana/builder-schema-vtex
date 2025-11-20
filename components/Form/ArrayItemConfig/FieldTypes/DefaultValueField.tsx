import { ArrayItemProperty } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface DefaultValueFieldProps {
  property: ArrayItemProperty;
  onUpdate: (field: string, value: string | undefined) => void;
}

export function DefaultValueField({ property, onUpdate }: DefaultValueFieldProps) {
  // Não mostrar para array e object
  if (property.type === 'array' || property.type === 'object') {
    return null;
  }

  return (
    <div>
      <Label className="text-xs">Valor Padrão</Label>
      <Input
        type="text"
        value={property.defaultValue || ''}
        onChange={(e) => onUpdate('defaultValue', e.target.value)}
        placeholder="Valor padrão"
        className="h-8 text-sm"
      />
    </div>
  );
}
