'use client'

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Info } from 'lucide-react';
import ArrayItemConfig from '../../ArrayItemConfig/index';
import BasePropertyField from '../Shared/BasePropertyField';
import { BasePropertyFieldProps } from '../Shared/types';

export default function ArrayField({ property, onChange, onRemove }: BasePropertyFieldProps) {
  const handleChange = <K extends keyof typeof property>(field: K, value: typeof property[K]) => {
    onChange({ ...property, [field]: value });
  };

  return (
    <BasePropertyField property={property} onChange={onChange} onRemove={onRemove} showDefaultValue={false}>
      <div className="border-t border-border pt-3">
        <Label>Título do Item do Array</Label>
        <Input
          type="text"
          value={property.arrayItemTitle || ''}
          onChange={(e) => handleChange('arrayItemTitle', e.target.value)}
          placeholder="Ex: Image"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={property.enableEditorItemTitle === 'true'}
            onChange={(e) => handleChange('enableEditorItemTitle', e.target.checked ? 'true' : '')}
            className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
          />
          Permitir editar nome do item no Site Editor
        </label>
        <p className="text-xs text-muted-foreground mt-1 ml-6">
          Adiciona o campo __editorItemTitle para personalizar o nome de cada item
        </p>
      </div>

      {property.enableEditorItemTitle && (
        <div className="ml-6 p-3 bg-muted border border-border rounded">
          <div>
            <Label className="text-xs">Título Padrão do __editorItemTitle</Label>
            <Input
              type="text"
              value={property.editorItemTitleDefault || ''}
              onChange={(e) => handleChange('editorItemTitleDefault', e.target.value)}
              placeholder="Ex: Image Item"
              className="h-8"
            />
          </div>
          <div className="mt-2">
            <Label className="text-xs">Label do Campo</Label>
            <Input
              type="text"
              value={property.editorItemTitleLabel || ''}
              onChange={(e) => handleChange('editorItemTitleLabel', e.target.value)}
              placeholder="Ex: Change item name"
              className="h-8"
            />
          </div>
        </div>
      )}

      <div>
        <Label>Valor Padrão do Array (JSON)</Label>
        <Textarea
          value={property.arrayDefaultValue || ''}
          onChange={(e) => handleChange('arrayDefaultValue', e.target.value)}
          placeholder='Ex: [{"src": "", "alt": "Text alternative"}]'
          rows={3}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Opcional: Array JSON com valores padrão
        </p>
      </div>

      <ArrayItemConfig
        properties={property.arrayItemProperties || []}
        onChange={(props) => handleChange('arrayItemProperties', props)}
      />
    </BasePropertyField>
  );
}
