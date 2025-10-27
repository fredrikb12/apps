import { createFileRoute } from "@tanstack/react-router";
import Grid from "../../features/todos/grid/Grid";

export const Route = createFileRoute("/grid/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Grid />;
}
