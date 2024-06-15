import { Portal } from "solid-js/web";
import { JSX, Show, createEffect, createSignal } from "solid-js";

export function SSRPortal(props: { children: JSX.Element }) {
  // Create a signal to track if the component is mounted
  const [isMounted, setIsMounted] = createSignal(false);

  // Set the signal to true after the component is mounted
  createEffect(() => {
    setIsMounted(true);
  });

  // Render a placeholder div on the server and a Portal on the client
  return (
    <Show
      when={isMounted()}
      fallback={<div id="portal-placeholder">{props.children}</div>}
    >
      <Portal mount={document.body}>{props.children}</Portal>
    </Show>
  );
}
