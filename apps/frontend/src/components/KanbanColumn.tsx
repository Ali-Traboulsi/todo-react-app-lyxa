import React from "react";
import KanbanCard from "./KanbanCard";
import { KanbanColumnProps, Status } from "../types/kanbanBoard";

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  items = [],
  status,
  onAddCard,
  onCardClick,
  onCardEdit,
  onCardDelete,
  onCardDrop,
  maxItems,
  allowAddNew = true,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    onCardDrop?.(cardId, status);
  };

  const getStatusClass = (): string => {
    switch (status) {
      case Status.TODO:
        return "status-todo";
      case Status.ONGOING:
        return "status-ongoing";
      case Status.DONE:
        return "status-done";
      default:
        return "";
    }
  };

  const canAddMore = !maxItems || items.length < maxItems;

  return (
    <div
      className={`kanban-column ${getStatusClass()}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="kanban-column-header">
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
              {items.length}
            </span>
            {maxItems && (
              <span className="text-xs text-gray-500">/ {maxItems}</span>
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <KanbanCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
            priority={item.priority}
            dueDate={item.dueDate}
            createdAt={item.createdAt}
            assignee={item.assignee}
            tags={item.tags}
            onCardClick={onCardClick}
            onCardEdit={onCardEdit}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>

      {/* Add New Card Button */}
      {allowAddNew && canAddMore && (
        <button className="kanban-add-card" onClick={() => onAddCard?.(status)}>
          + Add new card
        </button>
      )}

      {/* Max items reached message */}
      {maxItems && !canAddMore && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 p-2">
          Maximum {maxItems} items reached
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;
