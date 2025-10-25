import { createFileRoute, Link } from "@tanstack/react-router";
import { useTodos } from "../../../store/useTodos";
import { z } from "zod";
import type React from "react";
import TodoList from "../../../features/todos/TodoList";

const todoFilterSearchSchema = z.object({
  filters: z.array(z.enum(["urgent", "important"])).default([]),
});

export const Route = createFileRoute("/apps/todos/")({
  component: RouteComponent,
  validateSearch: todoFilterSearchSchema,
});

function RouteComponent() {
  const { todos } = useTodos();
  const { filters } = Route.useSearch();
  const nav = Route.useNavigate();
  console.log("todos: ", todos);

  function handleCheckboxClick(type: "urgent" | "important") {
    return function handleFilterUpdate(e: React.ChangeEvent<HTMLInputElement>) {
      const { checked } = e.target;
      if (!checked) {
        return updateFilters(filters.filter((f) => f !== type));
      } else {
        return updateFilters(filters.concat(type));
      }
    };
  }

  const updateFilters = (filters: ("urgent" | "important")[]) => {
    nav({
      search: {
        filters,
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <label style={{ cursor: "pointer" }}>
          Urgent
          <input
            type="checkbox"
            checked={filters.includes("urgent")}
            onChange={handleCheckboxClick("urgent")}
          />
        </label>
        <label style={{ cursor: "pointer" }}>
          Important
          <input
            type="checkbox"
            checked={filters.includes("important")}
            onChange={handleCheckboxClick("important")}
          />
        </label>
      </div>
      <Link to="/todos/create">Create New Todo</Link>
      <TodoList />
    </>
  );
}
