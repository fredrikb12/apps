import { getRouteApi } from "@tanstack/react-router";
import { useTodos } from "../../store/useTodos";
import Todo from "../../features/todos/Todo";

const routeApi = getRouteApi("/todos/");

export default function TodoList() {
  const { filters } = routeApi.useSearch();
  const { todos } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filters.length === 0) return true;
    return filters.every((filter) => todo[filter] === true);
  });
  return (
    <div>
      {todos.length > 0 && filteredTodos.length === 0 && (
        <h2>No tasks match your filters!</h2>
      )}
      {todos.length === 0 && <h2>No tasks yet!</h2>}
      {filteredTodos.map((t) => {
        return <Todo key={t.id} {...t} />;
      })}
    </div>
  );
}
