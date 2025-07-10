import React, { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import {
  KanbanBoardProps,
  TodoItem,
  KanbanColumn as KanbanColumnType,
  Status,
} from "../types/kanbanBoard";
import TaskModal from "./TaskModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null);
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<Status>(Status.TODO);

  const getItemsByStatus = (status: Status): TodoItem[] => {
    return items.filter((item) => item.status === status);
  };

  const handleAddCard = (status: Status): void => {
    setNewTaskStatus(status);
    setEditingItem(null);
    setIsNewTask(true);
    setIsModalOpen(true);
  };

  const handleCardClick = (cardId: string): void => {
    const item = items.find((item) => item.id === cardId);
    console.log(`Card clicked: ${cardId}`);
    // You can implement navigation or modal opening here

    if (item) {
      console.log(`Card details:`, item);
      onEditItem?.(item); // Notify parent to handle card click
      setEditingItem(item);
      setIsNewTask(false);
      setIsModalOpen(true);
    }
  };

  const handleCardEdit = (cardId: string): void => {
    const item = items.find((item) => item.id === cardId);

    if (item) {
      console.log(`Card edit requested: ${cardId}`);
      onEditItem?.(item);
      setEditingItem(item); // Set the item to edit (not null)
      setIsNewTask(false); // This is editing, not creating new
      setIsModalOpen(true);
    }
  };

  const handleCardDelete = (cardId: string): void => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      const updatedItems = items.filter((item) => item.id !== cardId);
      setItems(updatedItems);
      onItemsChange?.(updatedItems);
      onDeleteItem?.(cardId);
    }
  };

  const handleModalSave = (updatedItem: TodoItem): void => {
    if (isNewTask) {
      // Creating new task
      const newItem = {
        ...updatedItem,
        status: newTaskStatus as Status,
        createdAt: new Date().toISOString(),
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      onItemsChange?.(updatedItems);
      onAddItem?.(newItem);
    } else {
      // Editing existing task
      const updatedItems = items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setItems(updatedItems);
      onItemsChange?.(updatedItems);
      onEditItem?.(updatedItem);
    }
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setEditingItem(null);
    setIsNewTask(false);
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
    <>
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
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        item={editingItem}
        isNewTask={isNewTask}
      />
    </>
  );
};

export default KanbanBoard;
