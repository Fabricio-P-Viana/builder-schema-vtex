import { PropertyForm, ArrayItemProperty, ConditionalFieldForm } from '@/types';

export type PropertyItem = PropertyForm | ArrayItemProperty | ConditionalFieldForm;

export interface PropertyNavigator {
  canNavigate(item: PropertyItem): boolean;
  getChildren(item: PropertyItem): PropertyItem[] | undefined;
  setChildren(item: PropertyItem, children: PropertyItem[]): PropertyItem;
  addChild(item: PropertyItem, newChild: PropertyItem): PropertyItem;
  removeChild(item: PropertyItem, childIndex: number): PropertyItem;
}
