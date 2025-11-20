import { PropertyNavigator, PropertyItem } from './types';
import { ArrayPropertyNavigator } from './ArrayPropertyNavigator';
import { ObjectPropertyNavigator } from './ObjectPropertyNavigator';
import { ConditionalPropertyNavigator } from './ConditionalPropertyNavigator';

export class PropertyNavigatorFactory {
  private navigators: PropertyNavigator[];

  constructor() {
    this.navigators = [
      new ArrayPropertyNavigator(),
      new ObjectPropertyNavigator(),
      new ConditionalPropertyNavigator()
    ];
  }

  getNavigator(item: PropertyItem): PropertyNavigator | null {
    return this.navigators.find(nav => nav.canNavigate(item)) || null;
  }

  getChildren(item: PropertyItem): PropertyItem[] | null {
    const navigator = this.getNavigator(item);
    if (!navigator) return null;
    
    const children = navigator.getChildren(item);
    return children !== undefined ? children : null;
  }

  setChildren(item: PropertyItem, children: PropertyItem[]): PropertyItem {
    const navigator = this.getNavigator(item);
    return navigator ? navigator.setChildren(item, children) : item;
  }

  addChild(item: PropertyItem, newChild: PropertyItem): PropertyItem {
    const navigator = this.getNavigator(item);
    return navigator ? navigator.addChild(item, newChild) : item;
  }

  removeChild(item: PropertyItem, childIndex: number): PropertyItem {
    const navigator = this.getNavigator(item);
    return navigator ? navigator.removeChild(item, childIndex) : item;
  }

  getChildrenCount(item: PropertyItem): number {
    const children = this.getChildren(item);
    return children ? children.length : 0;
  }

  hasChildren(item: PropertyItem): boolean {
    const children = this.getChildren(item);
    return children !== null && children.length > 0;
  }

  canAddChildren(item: PropertyItem): boolean {
    const navigator = this.getNavigator(item);
    return navigator !== null;
  }
}
