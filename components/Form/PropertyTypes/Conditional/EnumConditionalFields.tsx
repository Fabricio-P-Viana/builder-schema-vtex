'use client'

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface EnumConditionalFieldsProps {
  enumValues?: string;
  enumNames?: string;
  onEnumValuesChange: (values: string) => void;
  onEnumNamesChange: (names: string) => void;
}

export default function EnumConditionalFields({ 
  enumValues, 
  enumNames, 
  onEnumValuesChange, 
  onEnumNamesChange 
}: EnumConditionalFieldsProps) {
  return (
    <>
      <div>
        <Label className="text-xs font-medium">Enum Values *</Label>
        <Input
          type="text"
          value={enumValues || ''}
          onChange={(e) => onEnumValuesChange(e.target.value)}
          placeholder="Ex: basic, premium, vip"
          className="h-9 text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Valores separados por vírgula
        </p>
      </div>
      
      <div>
        <Label className="text-xs font-medium">Enum Names (opcional)</Label>
        <Input
          type="text"
          value={enumNames || ''}
          onChange={(e) => onEnumNamesChange(e.target.value)}
          placeholder="Ex: Básico, Premium, VIP"
          className="h-9 text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Labels amigáveis (mesma ordem dos values)
        </p>
      </div>
    </>
  );
}
