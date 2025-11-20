'use client'

import { ConditionalField as ConditionalFieldType } from '@/types';
import { Info } from 'lucide-react';
import ConditionalFieldsConfig from './ConditionalFieldsConfig';
import BasePropertyEditor from '../Shared/BasePropertyEditor';
import { BasePropertyEditorProps } from '../Shared/types';

export default function ConditionalEditor({ property, onChange }: BasePropertyEditorProps) {
  if (!('conditionalFields' in property)) return null;

  return (
    <BasePropertyEditor property={property} onChange={onChange}>
      <div className="border-t border-border pt-4">
        <div className="bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg p-4 mb-4">
          <div className="flex gap-2">
            <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-1">
                Tipo Condicional (Dependencies)
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-400 mb-2">
                Este tipo gera automaticamente um campo <strong>enum</strong> com valores 
                <code className="mx-1 px-1 bg-purple-200 dark:bg-purple-800 rounded">none</code> e 
                <code className="mx-1 px-1 bg-purple-200 dark:bg-purple-800 rounded">provide</code>, 
                labels <strong>&quot;Não&quot;</strong> e <strong>&quot;Sim&quot;</strong>, 
                e widget <strong>radio</strong>.
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                Os campos condicionais serão exibidos apenas quando 
                <code className="mx-1 px-1 bg-purple-200 dark:bg-purple-800 rounded">provide</code> 
                for selecionado, usando a estrutura <code>dependencies</code> do JSON Schema.
              </p>
            </div>
          </div>
        </div>

        {/* Campos Enum fixos - apenas informativo */}
        <div className="mb-4 p-3 bg-muted border border-border rounded space-y-2">
          <p className="text-sm font-medium text-foreground">Configuração Automática:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-semibold">Enum Values:</span>
              <code className="ml-1 text-primary">none, provide</code>
            </div>
            <div>
              <span className="font-semibold">Enum Names:</span>
              <code className="ml-1 text-primary">Não, Sim</code>
            </div>
            <div>
              <span className="font-semibold">Widget:</span>
              <code className="ml-1 text-primary">radio</code>
            </div>
            <div>
              <span className="font-semibold">Default:</span>
              <code className="ml-1 text-primary">none</code>
            </div>
          </div>
        </div>

        {/* Configurador de campos condicionais */}
        <ConditionalFieldsConfig
          fields={property.conditionalFields || []}
          onChange={(fields: ConditionalFieldType[]) => onChange('conditionalFields', fields)}
          triggerValue="provide"
        />
      </div>
    </BasePropertyEditor>
  );
}
