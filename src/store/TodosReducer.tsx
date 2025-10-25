export type AddTodo = {
  urgent: boolean;
  important: boolean;
  date: string | null;
  title: string;
  text: string;
  done: boolean;
};

export type ChangeTodo = {
  id: string;
  urgent: boolean;
  important: boolean;
  date: string | null;
  title: string;
  text: string;
  done: boolean;
};

export type DeleteTodo = {
  id: string;
};

export type TodoAction =
  | { type: "added"; todo: AddTodo }
  | { type: "changed"; todo: ChangeTodo }
  | { type: "deleted"; todo: DeleteTodo };

export type Todo = {
  id: string;
  urgent: boolean;
  important: boolean;
  date: string | null;
  title: string;
  text: string;
  done: boolean;
};

// function todosReducer(todos: Todo[], action: TodoAction): Todo[] {
//   switch (action.type) {
//     case "added": {
//       const newTodos = [...todos, { ...action.todo, id: uuidv4() }];
//       saveTodos(newTodos);
//       return newTodos;
//     }
//     case "changed": {
//       return todos.map((t) => {
//         if (t.id === action.todo.id) {
//           return action.todo;
//         } else {
//           return t;
//         }
//       });
//     }
//     case "deleted": {
//       return todos.filter((t) => t.id !== action.todo.id);
//     }
//   }
// }

// export const TodosContext = createContext<Todo[]>([]);
// export const TodosDispatchContext = createContext(null);

// export { todosReducer };
