'use client'

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Info } from 'lucide-react';
import BasePropertyEditor from '../Shared/BasePropertyEditor';
import { BasePropertyEditorProps } from '../Shared/types';

export default function EnumEditor({ property, onChange }: BasePropertyEditorProps) {
  return (
    <BasePropertyEditor property={property} onChange={onChange}>
      <div>
        <Label>Enum (valores permitidos, separados por vírgula)</Label>
        <Input
          type="text"
          value={'enumValues' in property ? property.enumValues || '' : ''}
          onChange={(e) => onChange('enumValues', e.target.value)}
          placeholder="Ex: red, blue, green"
        />
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Use para criar dropdown com valores específicos
        </p>
      </div>

      <div>
        <Label>Enum Names (nomes amigáveis, separados por vírgula)</Label>
        <Input
          type="text"
          value={'enumNames' in property ? property.enumNames || '' : ''}
          onChange={(e) => onChange('enumNames', e.target.value)}
          placeholder="Ex: Vermelho, Azul, Verde"
        />
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Opcional: Nomes que aparecem no Site Editor (mesma ordem do enum)
        </p>
      </div>
    </BasePropertyEditor>
  );
}
