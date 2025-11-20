'use client'

import { ConditionalField, WidgetType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import ConditionalFieldBase from './ConditionalFieldBase';
import StringConditionalFields from './StringConditionalFields';
import EnumConditionalFields from './EnumConditionalFields';

interface ConditionalFieldItemProps {
  field: ConditionalField;
  index: number;
  onUpdate: (field: ConditionalField) => void;
  onRemove: () => void;
}

export default function ConditionalFieldItem({ 
  field, 
  index, 
  onUpdate, 
  onRemove 
}: ConditionalFieldItemProps) {
  const handleFieldChange = <K extends keyof ConditionalField>(
    key: K, 
    value: ConditionalField[K]
  ) => {
    onUpdate({ ...field, [key]: value });
  };

  const renderTypeSpecificFields = () => {
    switch (field.type) {
      case 'string':
        return (
          <StringConditionalFields
            widget={field.widget}
            format={field.format}
            onWidgetChange={(widget: WidgetType | undefined) => handleFieldChange('widget', widget)}
            onFormatChange={(format: string) => handleFieldChange('format', format)}
          />
        );
      case 'enum':
        return (
          <EnumConditionalFields
            enumValues={field.enumValues}
            enumNames={field.enumNames}
            onEnumValuesChange={(values: string) => handleFieldChange('enumValues', values)}
            onEnumNamesChange={(names: string) => handleFieldChange('enumNames', names)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded">
            Campo #{index + 1}
          </span>
          {field.name && (
            <code className="text-xs text-muted-foreground font-mono">{field.name}</code>
          )}
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={onRemove}
          className="h-7 w-7"
          title="Remover campo"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <ConditionalFieldBase
          field={field}
          onChange={handleFieldChange}
        />
        
        {renderTypeSpecificFields()}
      </div>
    </div>
  );
}
