import { api } from "~/lib/api";

export default function MainPage() {
  return (
    <div>
      I am in the dashboard
      <button
        onClick={async () => {
          await api.auth.signout.mutate();
          window.location.href = "/";
        }}
      >
        Sign out
      </button>
    </div>
  );
}
