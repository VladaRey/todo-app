"use server";

import { auth } from "@clerk/nextjs/server";
import { TodosOperations } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateTodo(id: string, title: string) {
  await TodosOperations.updateTodo(id, { title });

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await TodosOperations.deleteTodo(id);

  revalidatePath("/");
}

export async function toggleTodo(id: string, completed: boolean) {
  await TodosOperations.updateTodo(id, { completed });

  revalidatePath("/");
}

export async function createTodo(title: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await TodosOperations.createTodo(userId, title);

  revalidatePath("/");
}
