import { A, useNavigate } from "@solidjs/router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <A href="auth/login">Login</A>
      <a href="/dashboard">Hello</a>
      <button onClick={() => (window.location.href = "/dashboard")}>
        Dashboard
      </button>
    </div>
  );
}
