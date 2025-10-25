import { create } from "zustand";
import {
  type AddTodo,
  type ChangeTodo,
  type DeleteTodo,
  type Todo,
} from "./TodosReducer";
import { v4 as uuidv4 } from "uuid";
import { getTodosOnLoad, saveTodos } from "./localStorage";

type TodosState = {
  todos: Todo[];
  addTodo: (todo: AddTodo) => void;
  deleteTodo: (todo: DeleteTodo) => void;
  changeTodo: (todo: ChangeTodo) => void;
};

const todoGenerator = (index: number, todoOverride: Partial<Todo>): Todo => {
  const baseTodo = {
    id: uuidv4(),
    title: `Title ${index}`,
    text: `Text ${index}`,
    urgent: false,
    important: false,
    date: null,
    done: false,
  };
  return { ...baseTodo, ...todoOverride };
};

const t = [...Array(10)]
  .map((_val, i) => {
    return i + 1;
  })
  .map((index) => {
    return todoGenerator(index, {
      urgent: index % 2 === 0,
      important: index % 3 === 0,
      date: index % 5 === 0 ? "2025-12-24" : null,
    });
  });

const savedTodos = getTodosOnLoad();
console.log("saved todos: ", savedTodos);
const initialState: Todo[] = getTodosOnLoad() || t;
// const initialState: Todo[] = import.meta.env.DEV ? t : getTodosOnLoad() || [];

export const useTodos = create<TodosState>()((set) => {
  return {
    todos: initialState,
    addTodo: (todo) =>
      set((state) => {
        const newState = {
          todos: state.todos.concat({ ...todo, id: uuidv4() }),
        };
        saveTodos(newState.todos);
        return newState;
      }),
    deleteTodo(todo) {
      set((state) => {
        const newState = {
          todos: state.todos.filter((t) => t.id !== todo.id),
        };
        saveTodos(newState.todos);
        return newState;
      });
    },
    changeTodo(todo) {
      set((state) => {
        return {
          todos: state.todos.map((t) => {
            if (t.id === todo.id) return todo;
            return t;
          }),
        };
      });
    },
  };
});
