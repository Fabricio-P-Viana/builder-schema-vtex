'use client'

import { ConditionalField } from '@/types';
import { Button } from '@/components/ui/Button';
import { Plus, Info } from 'lucide-react';
import ConditionalFieldItem from './ConditionalFieldItem';

interface ConditionalFieldsConfigProps {
  fields: ConditionalField[];
  onChange: (fields: ConditionalField[]) => void;
  triggerValue?: string;
}

export default function ConditionalFieldsConfig({ 
  fields, 
  onChange,
  triggerValue
}: ConditionalFieldsConfigProps) {
  const addField = () => {
    const newField: ConditionalField = {
      id: Date.now().toString(),
      name: '',
      type: 'string',
      title: '',
      description: '',
      defaultValue: '',
    };
    onChange([...fields, newField]);
  };

  const updateField = (id: string, updatedField: ConditionalField) => {
    onChange(fields.map((f) => (f.id === id ? updatedField : f)));
  };

  const removeField = (id: string) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  return (
    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md">
      {/* Informação sobre Dependencies */}
      <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-300 dark:border-purple-700">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-1">
              Campo Condicional (Dependencies)
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-400">
              Ao selecionar o valor <strong>&quot;{triggerValue || 'provide'}&quot;</strong> no enum, 
              os campos abaixo serão exibidos automaticamente. O schema gerará uma estrutura 
              <code className="mx-1 px-1 bg-purple-200 dark:bg-purple-800 rounded">dependencies</code> 
              conforme o padrão VTEX.
            </p>
          </div>
        </div>
      </div>

      {/* Header com botão de adicionar */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-300">
          Campos Condicionais
        </h4>
        <Button
          onClick={addField}
          size="sm"
          className="h-7 text-xs"
          variant="success"
        >
          <Plus className="w-3 h-3" />
          Campo
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="text-sm text-purple-700 dark:text-purple-400 text-center py-4">
          Nenhum campo condicional adicionado. Clique em <strong>+ Campo</strong> para adicionar campos 
          que aparecerão quando o valor do enum for selecionado.
        </p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <ConditionalFieldItem
              key={field.id}
              field={field}
              index={index}
              onUpdate={(updatedField: ConditionalField) => updateField(field.id, updatedField)}
              onRemove={() => removeField(field.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
