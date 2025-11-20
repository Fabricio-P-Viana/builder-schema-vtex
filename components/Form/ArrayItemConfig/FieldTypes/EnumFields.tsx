import { ArrayItemProperty } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface EnumFieldsProps {
  property: ArrayItemProperty;
  onUpdate: (field: string, value: string | undefined) => void;
}

export function EnumFields({ property, onUpdate }: EnumFieldsProps) {
  if (property.type !== 'enum') return null;

  return (
    <>
      <div>
        <Label className="text-xs">Valores (separados por vírgula)</Label>
        <Input
          type="text"
          value={property.enumValues || ''}
          onChange={(e) => onUpdate('enumValues', e.target.value)}
          placeholder="Ex: red, blue, green"
          className="h-8 text-sm"
        />
      </div>
      <div>
        <Label className="text-xs">Nomes (opcional)</Label>
        <Input
          type="text"
          value={property.enumNames || ''}
          onChange={(e) => onUpdate('enumNames', e.target.value)}
          placeholder="Ex: Vermelho, Azul, Verde"
          className="h-8 text-sm"
        />
      </div>
    </>
  );
}
