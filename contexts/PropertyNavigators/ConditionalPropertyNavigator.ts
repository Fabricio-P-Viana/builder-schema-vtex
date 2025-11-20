import { ConditionalFieldForm } from '@/types';
import { PropertyNavigator, PropertyItem } from './types';

export class ConditionalPropertyNavigator implements PropertyNavigator {
  canNavigate(item: PropertyItem): boolean {
    return item.type === 'conditional';
  }

  getChildren(item: PropertyItem): PropertyItem[] | undefined {
    if (this.canNavigate(item) && 'conditionalFields' in item) {
      return item.conditionalFields as PropertyItem[];
    }
    return undefined;
  }

  setChildren(item: PropertyItem, children: PropertyItem[]): PropertyItem {
    return {
      ...item,
      conditionalFields: children as ConditionalFieldForm[]
    };
  }

  addChild(item: PropertyItem, newChild: PropertyItem): PropertyItem {
    const current = this.getChildren(item) || [];
    return this.setChildren(item, [...current, newChild]);
  }

  removeChild(item: PropertyItem, childIndex: number): PropertyItem {
    const current = this.getChildren(item) || [];
    return this.setChildren(item, current.filter((_, i) => i !== childIndex));
  }
}
