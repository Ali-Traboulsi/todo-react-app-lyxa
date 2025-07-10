import { JSX, useState } from "react";
import "./App.css";
import { NavItem, Status, TodoItem } from "./types/kanbanBoard";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<string>("board");

  // Sample todo items
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: "1",
      title: "Setup project structure",
      description: "Create the basic folder structure and install dependencies",
      status: Status.TODO,
      priority: "high",
      dueDate: "2025-07-08",
      createdAt: "2025-07-01",
      assignee: "Ali",
      tags: ["setup", "urgent"],
    },
    {
      id: "2",
      title: "Design kanban board UI",
      description: "Create wireframes and design the kanban board interface",
      status: Status.ONGOING,
      priority: "medium",
      dueDate: "2025-07-12",
      createdAt: "2025-07-02",
      assignee: "Ali",
      tags: ["design", "ui"],
    },
    {
      id: "3",
      title: "Implement drag and drop",
      description: "Add drag and drop functionality between columns",
      status: Status.TODO,
      priority: "high",
      dueDate: "2025-07-15",
      createdAt: "2025-07-03",
      assignee: null,
      tags: ["feature", "interaction"],
    },
  ]);

  // Navigation items state
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      id: "board",
      label: "Kanban Board",
      icon: "📋",
      active: true,
      badge: todoItems.length.toString(),
    },
    {
      id: "list",
      label: "List View",
      icon: "📝",
      active: false,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: "📅",
      active: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      active: false,
    },
  ]);

  const handleNavItemClick = (clickedItem: NavItem): void => {
    setNavItems((items) =>
      items.map((item) => ({
        ...item,
        active: item.id === clickedItem.id,
      }))
    );

    setCurrentView(clickedItem.id);
    console.log("Navigated to:", clickedItem.label);
  };

  const handleItemsChange = (updatedItems: TodoItem[]): void => {
    setTodoItems(updatedItems);
    setNavItems((items) =>
      items.map((item) =>
        item.id === "board"
          ? { ...item, badge: updatedItems.length.toString() }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        title="Todo Item Tracker"
        navItems={navItems}
        onItemClick={handleNavItemClick}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === "board" && (
          <KanbanBoard
            initialItems={todoItems}
            onItemsChange={handleItemsChange}
            onAddItem={(item: TodoItem) => console.log("Added item:", item)}
            onEditItem={(item: TodoItem) => console.log("Edit item:", item)}
            onDeleteItem={(itemId: string) =>
              console.log("Deleted item:", itemId)
            }
          />
        )}

        {currentView !== "board" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to your Todo Tracker
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Current view: <span className="font-semibold">{currentView}</span>
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
              {currentView === "list" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">List View</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your todo list will appear here...
                  </p>
                </div>
              )}

              {currentView === "calendar" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your calendar view will appear here...
                  </p>
                </div>
              )}

              {currentView === "settings" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Settings</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    App settings will appear here...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
