import { PropertyForm, ArrayItemProperty, ConditionalFieldForm } from '@/types';

// Props base para todos os componentes Field (form de criação)
export interface BasePropertyFieldProps {
  property: PropertyForm;
  onChange: (updatedProperty: PropertyForm) => void;
  onRemove: () => void;
}

// Props base para todos os componentes Editor (edição em tree)
export interface BasePropertyEditorProps {
  property: PropertyForm | ArrayItemProperty | ConditionalFieldForm;
  onChange: (field: string, value: unknown) => void;
}

// Props para componentes de configuração de itens aninhados
export interface NestedItemConfigProps {
  fields: Array<PropertyForm | ArrayItemProperty | ConditionalFieldForm>;
  onChange: (fields: Array<PropertyForm | ArrayItemProperty | ConditionalFieldForm>) => void;
}
