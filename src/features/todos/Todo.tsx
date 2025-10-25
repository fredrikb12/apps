import { Link } from "@tanstack/react-router";
import type { Todo } from "../../store/TodosReducer";
import { useTodos } from "../../store/useTodos";

export default function Todo(todo: Todo) {
  const { deleteTodo } = useTodos();
  return (
    <div style={{ border: "1px solid black", padding: "12px" }}>
      <p>{todo.title}</p>
      <p>{todo.text}</p>
      {todo.date && <p>Due: {todo.date}</p>}
      <div style={{ display: "flex", gap: "20px" }}>
        {todo.urgent && (
          <p
            style={{
              color: "black",
              backgroundColor: "orange",
              padding: "12px",
            }}
          >
            URGENT
          </p>
        )}
        {todo.important && (
          <p
            style={{
              color: "black",
              backgroundColor: "green",
              padding: "12px",
            }}
          >
            IMPORTANT
          </p>
        )}
      </div>
      <button>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/todos/$todoId/edit"
          params={{ todoId: todo.id }}
          search={{ from: location.pathname }}
        >
          Edit
        </Link>
      </button>
      <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
    </div>
  );
}
