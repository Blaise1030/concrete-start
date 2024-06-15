import { RouteSectionProps } from "@solidjs/router";

export function DashboardLayout(props: RouteSectionProps) {
  return (
    <>
      <div>Gello</div>
      {props.children}
    </>
  );
}
