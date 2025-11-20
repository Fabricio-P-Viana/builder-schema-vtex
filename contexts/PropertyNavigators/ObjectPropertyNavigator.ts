import { ArrayItemProperty } from '@/types';
import { PropertyNavigator, PropertyItem } from './types';

export class ObjectPropertyNavigator implements PropertyNavigator {
  canNavigate(item: PropertyItem): boolean {
    return item.type === 'object';
  }

  getChildren(item: PropertyItem): PropertyItem[] | undefined {
    if (this.canNavigate(item) && 'objectProperties' in item) {
      return item.objectProperties as PropertyItem[];
    }
    return undefined;
  }

  setChildren(item: PropertyItem, children: PropertyItem[]): PropertyItem {
    return {
      ...item,
      objectProperties: children as ArrayItemProperty[]
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
