'use client'

import { PropertyForm } from '@/types';
import { PropertyFieldFactory } from './PropertyTypes';

interface PropertyFieldProps {
  property: PropertyForm;
  onChange: (updatedProperty: PropertyForm) => void;
  onRemove: () => void;
}

export default function PropertyField({ property, onChange, onRemove }: PropertyFieldProps) {
  return <PropertyFieldFactory property={property} onChange={onChange} onRemove={onRemove} />;
}
