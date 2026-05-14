import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Todo = {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

export const TodosOperations = {
  async getTodos(userId: string) {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },

  async createTodo(userId: string, title: string) {
    const { data, error } = await supabase
      .from("todos")
      .insert({
        user_id: userId,
        title,
        completed: false,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async updateTodo(
    id: string,
    updates: { title?: string; completed?: boolean },
  ) {
    const { data, error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async deleteTodo(id: string) {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) throw error;

    return true;
  },
};
