import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTodos } from "../../store/useTodos";
import React from "react";
import CheckboxInput from "../../components/CheckboxInput";
import TextInput from "../../components/TextInput";

export const Route = createFileRoute("/todos/create")({
  component: RouteComponent,
});

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  text: HTMLInputElement;
  urgent: HTMLCheckboxElement;
  important: HTMLCheckboxElement;
}
interface TodoFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type HTMLCheckboxElement = {
  checked: boolean;
};

function RouteComponent() {
  const { addTodo, todos } = useTodos();
  const nav = useNavigate();
  console.log("todos: ", todos);

  function handleSubmit(event: React.FormEvent<TodoFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const { title, text, urgent, important } = form.elements;
    addTodo({
      title: title.value,
      urgent: urgent.checked,
      important: important.checked,
      date: null,
      done: false,
      text: text.value,
    });
    nav({ to: "/todos" });
  }

  return (
    <form
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        maxWidth: "600px",
        gap: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <TextInput
        name="title"
        label="Title"
        autoFocus
        required
        style={{ padding: "20px" }}
      />
      <TextInput
        name="text"
        label="Description"
        required
        style={{ padding: "20px" }}
      />
      <CheckboxInput
        name="important"
        label="Important"
        defaultChecked={false}
      />
      <CheckboxInput name="urgent" label="Urgent" defaultChecked={false} />
      <button type="submit">Add</button>
    </form>
  );
}
