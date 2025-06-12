'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define folder structure type
interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
}

// Mock folder structure data
const folderData: FolderItem[] = [
  {
    id: 'clients',
    name: 'Clients',
    type: 'folder',
    children: [
      {
        id: 'lafarge',
        name: 'Lafarge',
        type: 'folder',
        children: [
          { id: 'lafarge-eia', name: 'Environmental Impact Assessment', type: 'file' },
          { id: 'lafarge-safety', name: 'Safety Audit 2025', type: 'file' },
        ],
      },
      {
        id: 'ktda',
        name: 'KTDA',
        type: 'folder',
        children: [
          { id: 'ktda-safety', name: 'Safety Audit Report', type: 'file' },
          { id: 'ktda-energy', name: 'Energy Audit Data', type: 'file' },
        ],
      },
      {
        id: 'unga',
        name: 'Unga Group',
        type: 'folder',
        children: [
          { id: 'unga-fire', name: 'Fire Safety Certificate', type: 'file' },
          { id: 'unga-training', name: 'Training Attendance', type: 'file' },
        ],
      },
    ],
  },
  {
    id: 'categories',
    name: 'Categories',
    type: 'folder',
    children: [
      {
        id: 'assessments',
        name: 'Environmental Impact Assessments',
        type: 'folder',
        children: [
          { id: 'eia-template', name: 'EIA Template', type: 'file' },
          { id: 'eia-checklist', name: 'EIA Checklist', type: 'file' },
        ],
      },
      {
        id: 'audits',
        name: 'Audits',
        type: 'folder',
        children: [
          { id: 'safety-audits', name: 'Safety Audits', type: 'folder', children: [] },
          { id: 'energy-audits', name: 'Energy Audits', type: 'folder', children: [] },
        ],
      },
      {
        id: 'certificates',
        name: 'Certificates',
        type: 'folder',
        children: [],
      },
      {
        id: 'inspections',
        name: 'Inspection Reports',
        type: 'folder',
        children: [],
      },
    ],
  },
  {
    id: 'templates',
    name: 'Templates',
    type: 'folder',
    children: [
      { id: 'report-template', name: 'Report Template', type: 'file' },
      { id: 'checklist-template', name: 'Checklist Template', type: 'file' },
      { id: 'certificate-template', name: 'Certificate Template', type: 'file' },
    ],
  },
  {
    id: 'training',
    name: 'Training Materials',
    type: 'folder',
    children: [
      { id: 'first-aid', name: 'First Aid Training', type: 'file' },
      { id: 'fire-safety', name: 'Fire Safety Training', type: 'file' },
    ],
  },
];

interface FolderTreeItemProps {
  item: FolderItem;
  depth: number;
  selectedId: string;
  onSelect: (id: string) => void;
  expandedFolders: string[];
  onToggleExpand: (id: string) => void;
}

function FolderTreeItem({
  item,
  depth,
  selectedId,
  onSelect,
  expandedFolders,
  onToggleExpand,
}: FolderTreeItemProps) {
  const isExpanded = expandedFolders.includes(item.id);
  const isSelected = selectedId === item.id;
  
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpand(item.id);
  };
  
  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-muted/50",
          isSelected && "bg-muted font-medium"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => onSelect(item.id)}
      >
        {item.type === 'folder' && item.children && item.children.length > 0 ? (
          <span className="mr-1 text-muted-foreground" onClick={handleToggleExpand}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        ) : (
          <span className="w-5" />
        )}
        
        <span className="mr-2 text-muted-foreground">
          {item.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4" />
            ) : (
              <Folder className="h-4 w-4" />
            )
          ) : (
            <File className="h-4 w-4" />
          )}
        </span>
        
        <span className="text-sm">{item.name}</span>
      </div>
      
      {isExpanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FolderTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedFolders={expandedFolders}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocumentFolderTree() {
  const [selectedId, setSelectedId] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['clients', 'categories']);
  
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };
  
  const handleToggleExpand = (id: string) => {
    setExpandedFolders((prev) =>
      prev.includes(id) ? prev.filter((folderId) => folderId !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="rounded-md border p-2">
      {folderData.map((item) => (
        <FolderTreeItem
          key={item.id}
          item={item}
          depth={0}
          selectedId={selectedId}
          onSelect={handleSelect}
          expandedFolders={expandedFolders}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </div>
  );
}
