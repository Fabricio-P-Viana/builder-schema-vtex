'use client'

import { Info } from 'lucide-react';
import BasePropertyEditor from '../Shared/BasePropertyEditor';
import { BasePropertyEditorProps } from '../Shared/types';

export default function ObjectEditor({ property, onChange }: BasePropertyEditorProps) {
  return (
    <BasePropertyEditor property={property} onChange={onChange} showDefaultValue={false}>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
              Objeto Aninhado
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Use o botão <strong>+ (Plus)</strong> na árvore de propriedades à esquerda
              para adicionar itens dentro deste objeto.
            </p>
          </div>
        </div>
      </div>
    </BasePropertyEditor>
  );
}
