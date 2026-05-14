"use client";

import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { type Todo } from "@/lib/db";

type Props = {
  todo: Todo;
  onUpdate: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string, completed: boolean) => Promise<void>;
};

export function TodoItem({ todo, onUpdate, onDelete, onToggle }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [text, setText] = useState(todo.title);
  const [openDelete, setOpenDelete] = useState(false);

  const save = async () => {
    const trimmed = text.trim();

    if (!trimmed) return;

    await onUpdate(todo.id, trimmed);

    setOpenEdit(false);
  };

  const handleToggle = async () => {
    await onToggle(todo.id, !todo.completed);
  };

  return (
    <>
      <Card className="flex flex-row items-center gap-3 p-3">
        {/* toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggle}
          className="cursor-pointer"
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </Button>

        {/* text */}
        <div className="flex-1">
          <span
            className={
              todo.completed
                ? "line-through text-muted-foreground text-base"
                : " text-base"
            }
          >
            {todo.title}
          </span>
        </div>

        {/* actions */}
        {!isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setText(todo.title);
                setOpenEdit(true);
              }}
              className="cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenDelete(true)}
              className="cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={save}>
              <Check className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
      </Card>

      {/* Delete dialog */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(todo.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit sheet */}
      <Sheet open={openEdit} onOpenChange={setOpenEdit}>
        <SheetContent className="px-4">
          <SheetHeader className="pl-0">
            <SheetTitle className="text-xl">Edit task</SheetTitle>
          </SheetHeader>

          <div className="py-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  save();
                }
              }}
              autoFocus
            />
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>

            <Button onClick={save} disabled={!text.trim()}>
              Save
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
