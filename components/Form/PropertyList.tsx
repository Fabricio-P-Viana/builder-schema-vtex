'use client'

import { PropertyForm } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Trash2, ChevronRight, ChevronDown, FileJson, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useExpandable, usePropertyNavigator } from '@/hooks';
import ChildPropertyItem from './shared/ChildPropertyItem';

interface PropertyListProps {
  properties: PropertyForm[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  onAddProperty: () => void;
  onRemoveProperty: (id: string) => void;
}

export default function PropertyList({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onAddProperty,
  onRemoveProperty,
}: PropertyListProps) {
  const { toggle, isExpanded } = useExpandable<string>();
  const { hasChildren, getChildren } = usePropertyNavigator();

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))]">
      <div className="p-3 border-b border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Properties
          </span>
        </div>
        <Button onClick={onAddProperty} className="w-full text-sm" size="sm" variant="success">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nova Propriedade</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {properties.length === 0 ? (
          <div className="p-6 text-center">
            <Folder className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground mb-2">Nenhuma propriedade</p>
            <p className="text-xs text-muted-foreground/70">
              Clique no botão acima para adicionar
            </p>
          </div>
        ) : (
          <div className="py-1">
            {properties.map((property) => {
              const expanded = isExpanded(property.id);
              const hasPropertyChildren = hasChildren(property);
              const children = getChildren(property);
              
              return (
                <div key={property.id}>
                  {/* Item Principal */}
                  <div
                    className={cn(
                      "group flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-[hsl(var(--sidebar-hover))] transition-colors",
                      selectedPropertyId === property.id && "bg-[hsl(var(--sidebar-active))]"
                    )}
                    onClick={() => onSelectProperty(property.id)}
                  >
                    {/* Expand/Collapse Icon */}
                    {hasPropertyChildren ? (
                      <button
                        onClick={(e) => toggle(property.id, e)}
                        className="shrink-0 w-4 h-4 flex items-center justify-center hover:bg-[hsl(var(--sidebar-hover))] rounded"
                      >
                        {expanded ? (
                          <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                    ) : (
                      <div className="w-4" />
                    )}

                    {/* File/Folder Icon */}
                    {hasPropertyChildren ? (
                      expanded ? (
                        <FolderOpen className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-primary shrink-0" />
                      )
                    ) : (
                      <FileJson className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}

                    {/* Property Name */}
                    <span className={cn(
                      "text-sm flex-1 truncate",
                      property.name ? "text-foreground" : "text-muted-foreground italic"
                    )}>
                      {property.name || 'sem-nome'}
                    </span>

                    {/* Type Badge */}
                    <Badge 
                      variant={property.type as never}
                      className="scale-75 shrink-0"
                    >
                      {property.type}
                    </Badge>

                    {/* Delete Button */}
                    <button
                      className="opacity-0 group-hover:opacity-100 shrink-0 w-5 h-5 flex items-center justify-center bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveProperty(property.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>

                  {/* Children */}
                  {expanded && hasPropertyChildren && (
                    <div className="ml-4 border-l border-border">
                      {children.map((item) => (
                        <ChildPropertyItem 
                          key={item.id} 
                          item={item}
                          color={
                            property.type === 'array' ? 'purple' :
                            property.type === 'object' ? 'blue' :
                            'yellow'
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-[hsl(var(--sidebar-border))] bg-muted/50">
        <div className="text-xs text-muted-foreground text-center">
          {properties.length} {properties.length === 1 ? 'propriedade' : 'propriedades'}
        </div>
      </div>
    </div>
  );
}
