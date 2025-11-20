'use client'

import BasePropertyField from '../Shared/BasePropertyField';
import { BasePropertyFieldProps } from '../Shared/types';

export default function BooleanField({ property, onChange, onRemove }: BasePropertyFieldProps) {
  return <BasePropertyField property={property} onChange={onChange} onRemove={onRemove} />;
}
