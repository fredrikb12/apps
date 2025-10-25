import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useTodos } from "../../../store/useTodos";

const todoEditSearchSchema = z.object({
  from: z.string().optional(),
});

// type TodoEditSearch = z.infer<typeof todoEditSearchSchema>;

export const Route = createFileRoute("/apps/todos/$todoId/edit")({
  component: RouteComponent,
  validateSearch: todoEditSearchSchema,
});

function RouteComponent() {
  const { todoId } = Route.useParams();
  const { todos } = useTodos();
  const todo = todos.find((todo) => todo.id === todoId);
  const { from } = Route.useSearch();

  if (!todo) return <div>No todo with id {todoId} found.</div>;

  return (
    <div>
      {from !== undefined && (
        <button>
          <Link to={from}>Back</Link>
        </button>
      )}
      Editing todo {todoId}
    </div>
  );
}
