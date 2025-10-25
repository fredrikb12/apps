import z from "zod";
import type { Todo } from "./TodosReducer";

const todoSchema = z.object({
  id: z.uuid(),
  urgent: z.boolean(),
  important: z.boolean(),
  date: z.iso.date().nullable(),
  title: z.string(),
  text: z.string(),
  done: z.boolean(),
});

const todosSchema = z.array(todoSchema);

const LOCALSTORAGE_KEY = "todos_localstorage_key";

const getTodosOnLoad = (): Todo[] | null => {
  const stored = localStorage.getItem(LOCALSTORAGE_KEY);
  console.log("stored: ", stored);
  if (stored === null) return null;
  const result = todosSchema.safeParse(JSON.parse(stored));
  console.log("result: ", result);
  if (!result.success) return [];
  return result.data;
};

const saveTodos = (todos: Todo[]) => {
  console.log("saving todos: ", todos);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
};

export { getTodosOnLoad, saveTodos };
