import { useDroppable } from "@dnd-kit/core";
import type { JSX } from "react";

export default function Droppable(props: {
  id: string;
  children: JSX.Element;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
