import React, { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import {
  KanbanBoardProps,
  TodoItem,
  KanbanColumn as KanbanColumnType,
  Status,
} from "../types/kanbanBoard";

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialItems = [], // Items passed from parent (App.tsx)
  columns = [
    // Default column configuration
    { id: "todo", title: "To Do", status: Status.TODO },
    {
      id: "ongoing",
      title: "Ongoing",
      status: Status.ONGOING,
    },
    { id: "done", title: "Done", status: Status.DONE },
  ],
  onItemsChange, // Callback to notify parent of changes
  onAddItem, // Callback when new item is added
  onEditItem, // Callback when item is edited
  onDeleteItem, // Callback when item is deleted
}) => {
  const [items, setItems] = useState<TodoItem[]>(initialItems);

  const getItemsByStatus = (status: string): TodoItem[] => {
    return items.filter((item) => item.status === status);
  };

  const handleAddCard = (status: Status): void => {
    const newItem: TodoItem = {
      id: Date.now().toString(),
      title: "New Task",
      description: "",
      status,
      priority: "medium",
      dueDate: null,
      createdAt: new Date().toISOString(),
      assignee: null,
      tags: [],
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    onItemsChange?.(updatedItems); // notify parent of the change
    onAddItem?.(newItem); // notify parent of the new item
  };

  const handleCardClick = (cardId: string): void => {
    items.find((item) => item.id === cardId);
    console.log(`Card clicked: ${cardId}`);
    // You can implement navigation or modal opening here
  };

  const handleCardEdit = (cardId: string): void => {
    const item = items.find((item) => item.id === cardId);

    if (item) {
      console.log(`Card edit requested: ${cardId}`);
      onEditItem?.(item);
    }

    // You can implement the edit functionality here
  };

  const handleCardDelete = (cardId: string): void => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      const updatedItems = items.filter((item) => item.id !== cardId);
      setItems(updatedItems);
      onItemsChange?.(updatedItems);
      onDeleteItem?.(cardId);
    }
  };

  const handleCardDrop = (cardId: string, newStatus: Status): void => {
    const itemIndex = items.findIndex((item) => item.id === cardId);
    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        status: newStatus,
      };
      setItems(updatedItems);
      onItemsChange?.(updatedItems); // Notify parent of the change
    }
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          status={column.status}
          items={getItemsByStatus(column.status)}
          maxItems={column.maxItems}
          onAddCard={handleAddCard}
          onCardClick={handleCardClick}
          onCardEdit={handleCardEdit}
          onCardDelete={handleCardDelete}
          onCardDrop={handleCardDrop}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
