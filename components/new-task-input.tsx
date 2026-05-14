"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createTodo } from "@/lib/todo-actions";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function NewTaskInput() {
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = newTodo.trim();

    if (!trimmed) return;

    try {
      setIsLoading(true);

      await createTodo(trimmed);

      setNewTodo("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
        className="h-11"
      />

      <Button type="submit" disabled={!newTodo.trim()} className="h-11 cursor-pointer">
        <Plus className="w-4 h-4 mr-2" />
        {isLoading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
