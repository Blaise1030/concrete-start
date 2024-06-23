import {cache, createAsync} from "@solidjs/router";
import {onMount} from "solid-js";
import {client} from "~/utils/api";

const getUsers = cache(async () => {
  const response = await client.api.hello.$get();
  return await response.json();
}, "users");

export const route = {
  load: () => getUsers(),
};

export default function Home() {
  const user = createAsync(() => getUsers());

  return (
    <main class="w-full space-y-2">{JSON.stringify(user()?.message)}</main>
  );
}
