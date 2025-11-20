'use client'

import { PropertyType } from '@/types';
import { BasePropertyFieldProps } from './Shared/types';
import { StringField } from './String';
import { EnumField } from './Enum';
import { BooleanField } from './Boolean';
import { NumberField } from './Number';
import { ObjectField } from './Object';
import { ArrayField } from './Array';
import { ConditionalField } from './Conditional';

export default function PropertyFieldFactory(props: BasePropertyFieldProps) {
  const typeComponentMap: Record<PropertyType, React.ComponentType<BasePropertyFieldProps>> = {
    string: StringField,
    enum: EnumField,
    boolean: BooleanField,
    number: NumberField,
    object: ObjectField,
    array: ArrayField,
    conditional: ConditionalField,
  };

  const Component = typeComponentMap[props.property.type];
  
  return <Component {...props} />;
}
