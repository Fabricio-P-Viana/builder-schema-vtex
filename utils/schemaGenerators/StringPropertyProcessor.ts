import { VtexProperty, WidgetType } from '@/types';
import { PropertyProcessor, setDefaultValue } from './types';

interface StringProperty {
  type: 'string';
  widget?: string;
  format?: string;
  defaultValue?: string;
}

export class StringPropertyProcessor implements PropertyProcessor<StringProperty> {
  process(prop: StringProperty): Partial<VtexProperty> {
    const property: Partial<VtexProperty> = {};

    if (prop.widget) {
      property.widget = { 'ui:widget': prop.widget as WidgetType };
    }

    if (prop.format) {
      property.format = prop.format;
    }

    setDefaultValue(property, prop.type, prop.defaultValue);

    return property;
  }
}
