import { KanbanCardProps } from "../types/kanbanBoard";

const KanbanCard: React.FC<KanbanCardProps> = ({
  id,
  title,
  description,
  status,
  priority = "medium",
  dueDate,
  createdAt,
  assignee,
  tags = [],
  onCardClick,
  onCardEdit,
  onCardDelete,
}) => {
  // Check if task is overdue
  const isOverdue = dueDate && new Date(dueDate) < new Date();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    });
  };

  const getPriorityClass = (): string => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    e.dataTransfer.setData("text/plain", id);
  };

  return (
    <div
      className={`kanban-card ${getPriorityClass()} ${isOverdue ? "border-red-300 bg-red-50 dark:bg-red-900/20" : ""}`}
      onClick={() => onCardClick?.(id)}
      draggable
      onDragStart={handleDragStart}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="kanban-card-title flex-1">{title}</h4>
        {/* Status badge */}
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
            status === "todo"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              : status === "ongoing"
                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          }`}
        >
          {status === "ongoing"
            ? "In Progress"
            : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        <div className="flex space-x-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCardEdit?.(id);
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCardDelete?.(id);
            }}
            className="text-gray-400 hover:text-red-500 text-sm"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      {description && <p className="kanban-card-description">{description}</p>}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Meta */}
      <div className="kanban-card-meta">
        <div className="flex items-center space-x-2">
          {/* Priority indicator */}
          <span
            className={`w-2 h-2 rounded-full ${
              priority === "high"
                ? "bg-red-500"
                : priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            title={`${priority} priority`}
          ></span>

          {/* Assignee */}
          {assignee && <span className="text-xs">👤 {assignee}</span>}
        </div>

        <div className="text-right">
          {/* Due date */}
          {dueDate && (
            <div
              className={`text-xs ${isOverdue ? "text-red-600 dark:text-red-400 font-medium" : ""}`}
            >
              {isOverdue ? "⚠️ " : "📅 "}
              {formatDate(dueDate)}
              {isOverdue && " (Overdue)"}
            </div>
          )}

          {/* Created date */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Created: {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default KanbanCard;
