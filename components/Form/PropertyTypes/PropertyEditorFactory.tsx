'use client'

import { PropertyType } from '@/types';
import { BasePropertyEditorProps } from './Shared/types';
import { StringEditor } from './String';
import { EnumEditor } from './Enum';
import { BooleanEditor } from './Boolean';
import { NumberEditor } from './Number';
import { ObjectEditor } from './Object';
import { ArrayEditor } from './Array';
import { ConditionalEditor } from './Conditional';

export default function PropertyEditorFactory(props: BasePropertyEditorProps) {
  const typeComponentMap: Record<PropertyType, React.ComponentType<BasePropertyEditorProps>> = {
    string: StringEditor,
    enum: EnumEditor,
    boolean: BooleanEditor,
    number: NumberEditor,
    object: ObjectEditor,
    array: ArrayEditor,
    conditional: ConditionalEditor,
  };

  const Component = typeComponentMap[props.property.type];
  
  return <Component {...props} />;
}
