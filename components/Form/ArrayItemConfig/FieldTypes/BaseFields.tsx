import { ArrayItemProperty, PropertyType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

interface BaseFieldsProps {
  property: ArrayItemProperty;
  propertyTypes: PropertyType[];
  onUpdate: (field: string, value: string | PropertyType | undefined) => void;
}

export function BaseFields({ property, propertyTypes, onUpdate }: BaseFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Nome *</Label>
          <Input
            type="text"
            value={property.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Ex: src, alt"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label className="text-xs">Tipo *</Label>
          <Select
            value={property.type}
            onChange={(e) => onUpdate('type', e.target.value as PropertyType)}
            className="h-8 text-sm"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-xs">Título *</Label>
        <Input
          type="text"
          value={property.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: Image SRC"
          className="h-8 text-sm"
        />
      </div>

      <div>
        <Label className="text-xs">Descrição</Label>
        <Input
          type="text"
          value={property.description || ''}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Descrição opcional"
          className="h-8 text-sm"
        />
      </div>
    </>
  );
}
