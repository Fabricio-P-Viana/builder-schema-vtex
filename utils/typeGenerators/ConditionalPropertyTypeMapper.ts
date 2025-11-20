import { PropertyForm } from '@/types';
import { TypeScriptTypeMapper } from './types';

export class ConditionalPropertyTypeMapper implements TypeScriptTypeMapper<PropertyForm> {
  mapToTypeScript(): string {
    return "'none' | 'provide'";
  }
}
