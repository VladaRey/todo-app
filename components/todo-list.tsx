import { TodoItem } from "./todo-item";
import { type Todo } from "@/lib/db";

type TodoListProps = {
  todos: Todo[];
  onUpdate: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string, completed: boolean) => Promise<void>;
};


export function TodoList({ todos, ...actions }: TodoListProps) {
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <>
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No tasks yet</p>
            <p className="text-sm mt-1">Add your first task above</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} {...actions} />
          ))
        )}
      </div>
      {totalCount > 0 && (
        <div className="mb-4 text-sm text-muted-foreground">
          {completedCount} of {totalCount} tasks completed
        </div>
      )}
    </>
  );
}
