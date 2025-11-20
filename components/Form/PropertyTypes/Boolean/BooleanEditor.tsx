'use client'

import BasePropertyEditor from '../Shared/BasePropertyEditor';
import { BasePropertyEditorProps } from '../Shared/types';

export default function BooleanEditor({ property, onChange }: BasePropertyEditorProps) {
  return <BasePropertyEditor property={property} onChange={onChange} />;
}
