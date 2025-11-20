'use client'

import { PropertyForm } from '@/types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Info } from 'lucide-react';
import BasePropertyEditor from '../Shared/BasePropertyEditor';
import { BasePropertyEditorProps } from '../Shared/types';

export default function ArrayEditor({ property, onChange }: BasePropertyEditorProps) {
  // Type assertion para PropertyForm já que este editor só é usado para array
  const arrayProperty = property as PropertyForm;

  return (
    <BasePropertyEditor property={property} onChange={onChange} showDefaultValue={false}>
      <div className="border-t border-border pt-4">
        <Label>Título do Item do Array</Label>
        <Input
          type="text"
          value={arrayProperty.arrayItemTitle || ''}
          onChange={(e) => onChange('arrayItemTitle', e.target.value)}
          placeholder="Ex: Image"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Nome que aparece para cada item no Site Editor
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={arrayProperty.enableEditorItemTitle === 'true'}
            onChange={(e) => onChange('enableEditorItemTitle', e.target.checked ? 'true' : '')}
            className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
          />
          Permitir editar nome do item no Site Editor
        </label>
        <p className="text-xs text-muted-foreground mt-1 ml-6">
          Adiciona o campo __editorItemTitle para personalizar o nome de cada item
        </p>
      </div>

      {arrayProperty.enableEditorItemTitle && (
        <div className="ml-6 p-3 bg-muted border border-border rounded space-y-3">
          <div>
            <Label className="text-xs">Título Padrão do __editorItemTitle</Label>
            <Input
              type="text"
              value={arrayProperty.editorItemTitleDefault || ''}
              onChange={(e) => onChange('editorItemTitleDefault', e.target.value)}
              placeholder="Ex: Image Item"
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs">Label do Campo</Label>
            <Input
              type="text"
              value={arrayProperty.editorItemTitleLabel || ''}
              onChange={(e) => onChange('editorItemTitleLabel', e.target.value)}
              placeholder="Ex: Change item name"
              className="h-8"
            />
          </div>
        </div>
      )}

      <div>
        <Label>Valor Padrão do Array (JSON)</Label>
        <Textarea
          value={arrayProperty.arrayDefaultValue || ''}
          onChange={(e) => onChange('arrayDefaultValue', e.target.value)}
          placeholder='Ex: [{"src": "", "alt": "Text alternative"}]'
          rows={3}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          Opcional: Array JSON com valores padrão
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
              Array Aninhado
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Use o botão <strong>+ (Plus)</strong> na árvore de propriedades à esquerda
              para adicionar itens dentro deste array.
            </p>
          </div>
        </div>
      </div>
    </BasePropertyEditor>
  );
}
