'use client'

import { ConditionalField as ConditionalFieldType } from '@/types';
import ConditionalFieldsConfig from './ConditionalFieldsConfig';
import BasePropertyField from '../Shared/BasePropertyField';
import { BasePropertyFieldProps } from '../Shared/types';

export default function ConditionalField({ property, onChange, onRemove }: BasePropertyFieldProps) {
  const handleChange = <K extends keyof typeof property>(field: K, value: typeof property[K]) => {
    onChange({ ...property, [field]: value });
  };

  return (
    <BasePropertyField property={property} onChange={onChange} onRemove={onRemove}>
      <div className="border-t border-border pt-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
        <p className="text-sm text-purple-900 dark:text-purple-300 mb-2">
          <strong>Tipo Condicional:</strong> Cria um campo radio Não/Sim que mostra campos adicionais quando &quot;Sim&quot; é selecionado.
        </p>
        <p className="text-xs text-purple-700 dark:text-purple-400">
          O schema será gerado automaticamente com enum [&apos;none&apos;, &apos;provide&apos;] e widget radio.
        </p>
      </div>

      <ConditionalFieldsConfig
        fields={property.conditionalFields || []}
        onChange={(fields: ConditionalFieldType[]) => handleChange('conditionalFields', fields)}
      />
    </BasePropertyField>
  );
}
