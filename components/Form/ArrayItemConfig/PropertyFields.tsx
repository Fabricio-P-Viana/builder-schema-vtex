import { ArrayItemProperty, PropertyType, WidgetType } from '@/types';
import { BaseFields, EnumFields, StringFields, DefaultValueField } from './FieldTypes';

interface PropertyFieldsProps {
  property: ArrayItemProperty;
  propertyTypes: PropertyType[];
  widgetTypes: WidgetType[];
  onUpdate: (field: string, value: string | PropertyType | undefined) => void;
}

export function PropertyFields({ property, propertyTypes, widgetTypes, onUpdate }: PropertyFieldsProps) {
  return (
    <div className="space-y-2">
      <BaseFields property={property} propertyTypes={propertyTypes} onUpdate={onUpdate} />
      <EnumFields property={property} onUpdate={onUpdate} />
      <StringFields property={property} widgetTypes={widgetTypes} onUpdate={onUpdate} />
      <DefaultValueField property={property} onUpdate={onUpdate} />
    </div>
  );
}
