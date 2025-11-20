import { Badge } from '@/components/ui/Badge';
import { FileJson } from 'lucide-react';
import { cn } from '@/utils/cn';
import { PropertyItem } from '@/contexts/PropertyNavigators';

interface ChildPropertyItemProps {
  item: PropertyItem;
  color?: 'purple' | 'blue' | 'yellow';
}

const colorClasses = {
  purple: 'text-purple-500 dark:text-purple-400',
  blue: 'text-blue-500 dark:text-blue-400',
  yellow: 'text-yellow-500 dark:text-yellow-400'
};

export default function ChildPropertyItem({ item, color = 'purple' }: ChildPropertyItemProps) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 hover:bg-[hsl(var(--sidebar-hover))]">
      <div className="w-4" />
      <FileJson className={cn('w-3.5 h-3.5 shrink-0', colorClasses[color])} />
      <span className={cn(
        "text-xs flex-1 truncate",
        item.name ? "text-foreground" : "text-muted-foreground italic"
      )}>
        {item.name || 'sem-nome'}
      </span>
      <Badge 
        variant={item.type as never}
        className="scale-[0.65] shrink-0"
      >
        {item.type}
      </Badge>
    </div>
  );
}
