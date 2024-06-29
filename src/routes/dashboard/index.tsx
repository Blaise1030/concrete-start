import { Link } from "~/components/link";
import { client } from "~/utils/api";

export default function Dashboard() {
  return (
    <>
      <button
        onClick={async () => {
          const res = await client.api.auth.me.$get();
          console.log(res);
        }}
      >
        Hello
      </button>
      <Link href="/api/auth/logout">Logout</Link>
    </>
  );
}
