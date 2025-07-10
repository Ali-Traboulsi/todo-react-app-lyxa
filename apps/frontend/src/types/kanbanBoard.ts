export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: "low" | "medium" | "high";
  dueDate: string | null;
  createdAt: string;
  assignee: string | null;
  tags: string[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  badge?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: Status;
  maxItems?: number;
}

export interface NavbarProps {
  title: string;
  navItems: NavItem[];
  onItemClick: (item: NavItem) => void;
}

export interface KanbanCardProps {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority?: "low" | "medium" | "high";
  dueDate?: string | null;
  createdAt: string;
  assignee?: string | null;
  tags?: string[];
  onCardClick?: (id: string) => void;
  onCardEdit?: (id: string) => void;
  onCardDelete?: (id: string) => void;
}

export interface KanbanColumnProps {
  id: string;
  title: string;
  items: TodoItem[];
  status: Status;
  onAddCard?: (status: Status) => void;
  onCardClick?: (id: string) => void;
  onCardEdit?: (id: string) => void;
  onCardDelete?: (id: string) => void;
  onCardDrop?: (cardId: string, newStatus: Status) => void;
  maxItems?: number;
  allowAddNew?: boolean;
}

export interface KanbanBoardProps {
  initialItems?: TodoItem[];
  columns?: KanbanColumn[];
  onItemsChange?: (items: TodoItem[]) => void;
  onAddItem?: (item: TodoItem) => void;
  onEditItem?: (item: TodoItem) => void;
  onDeleteItem?: (itemId: string) => void;
}

export enum Status {
  TODO = "todo",
  ONGOING = "ongoing",
  DONE = "done",
}
