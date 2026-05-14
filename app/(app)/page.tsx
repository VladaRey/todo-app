import { NewTaskInput } from "@/components/new-task-input";
import { auth } from "@clerk/nextjs/server";
import { TodosOperations } from "@/lib/db";
import { TodoList } from "@/components/todo-list";
import { updateTodo, deleteTodo, toggleTodo } from "@/lib/todo-actions";

export default async function HomePage() {
  const { userId } = await auth();

  const todos = await TodosOperations.getTodos(userId!);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold">My Tasks</h1>
      <NewTaskInput />
      <TodoList
        todos={todos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}
