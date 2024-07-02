import {createResource} from "solid-js";
import {Link} from "~/components/link";
import {client} from "~/lib/api";

export default function Dashboard() {
  const [data, action] = createResource(async () => {
    const response = await client.api.notes.note.$get();
    return await response.json();
  });

  return (
    <>
      <header class="sticky top-0 left-0 z-10">
        <div>
          <button
            onClick={async () => {
              action.refetch();
            }}
          >
            Hello
          </button>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </header>
    </>
  );
}
