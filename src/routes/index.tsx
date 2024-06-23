import {onMount} from "solid-js";
import {client} from "~/utils/api";

export default function Home() {
  onMount(async () => {
    const res = await client.api.hello.$get();
    const data = await res.json();
  });

  return <main class="w-full space-y-2">What is this ? </main>;
}
