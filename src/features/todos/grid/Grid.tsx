import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useTodos } from "../../../store/useTodos";
import Todo from "../Todo";
import { Draggable } from "./Draggable";
import Droppable from "./Droppable";
import styles from "./grid.module.css";

const GRID = [
  { label: "", id: 1 },
  { label: "Urgent", id: 2 },
  { label: "Not Urgent", id: 3 },
  { label: "Important", id: 4 },
  { label: "5", id: 5, filters: { important: true, urgent: true } },
  { label: "6", id: 6, filters: { important: true, urgent: false } },
  { label: "Not Important", id: 7 },
  { label: "8", id: 8, filters: { important: false, urgent: true } },
  { label: "9", id: 9, filters: { important: false, urgent: false } },
];

export default function Grid() {
  const { todos, changeTodo } = useTodos();
  const getTodosByFilters = (filters: {
    important: boolean;
    urgent: boolean;
  }) => {
    return todos.filter((todo) => {
      return (
        todo.urgent === filters.urgent && todo.important === filters.important
      );
    });
  };
  const handleTodoDragEnd = (event: DragEndEvent) => {
    console.log("event: ", event);
    const { over } = event;
    if (over === null) return;
    console.log("1");
    console.log("over.id: ", over.id);
    const filters = GRID.find((g) => g.id === Number(over.id))?.filters;
    console.log("filters: ", filters);
    if (!filters) return;
    console.log("2");

    const todoId = event.active.id;
    console.log("todo id: ", todoId);
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;
    console.log("changing todo");
    changeTodo({
      ...todo,
      important: filters.important,
      urgent: filters.urgent,
    });
  };
  return (
    <div className={styles.grid}>
      <DndContext onDragEnd={handleTodoDragEnd}>
        {GRID.map((gridSection) => {
          return (
            <div key={gridSection.id} className={styles.gridItem}>
              {gridSection.filters !== undefined && (
                <Droppable id={gridSection.label}>
                  <div>
                    <p>Droppable Area</p>
                    {getTodosByFilters(gridSection.filters).map((t) => {
                      return (
                        <Draggable key={t.id} id={t.id}>
                          <Todo key={t.id} {...t} />
                        </Draggable>
                      );
                    })}
                  </div>
                </Droppable>
              )}
              {gridSection.filters === undefined &&
                gridSection.label !== "" && <span>{gridSection.label}</span>}
            </div>
          );
        })}
      </DndContext>
    </div>
  );
}
