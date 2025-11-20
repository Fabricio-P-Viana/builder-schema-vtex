import { ArrayItemProperty } from '@/types';
import { PropertyNavigator, PropertyItem } from './types';

export class ArrayPropertyNavigator implements PropertyNavigator {
  canNavigate(item: PropertyItem): boolean {
    return item.type === 'array';
  }

  getChildren(item: PropertyItem): PropertyItem[] | undefined {
    if (this.canNavigate(item) && 'arrayItemProperties' in item) {
      return item.arrayItemProperties as PropertyItem[];
    }
    return undefined;
  }

  setChildren(item: PropertyItem, children: PropertyItem[]): PropertyItem {
    return {
      ...item,
      arrayItemProperties: children as ArrayItemProperty[]
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
