import {type RouteSectionProps} from "@solidjs/router";
import {createSignal} from "solid-js";
import {client} from "~/utils/api";

export default function Login(props: RouteSectionProps) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isSignUp, setIsSignUp] = createSignal(false);
  return (
    <main>
      <div class="bg-red-500">
        <input
          type="checkbox"
          onChange={(e) => setIsSignUp(e.target.checked)}
          checked={isSignUp()}
        />
        <form
          class="flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            if (isSignUp())
              await client.api.auth.signup.$post({
                json: {
                  email: email(),
                  password: password(),
                },
              });
            else {
              await client.api.auth.login.$post({
                json: {
                  email: email(),
                  password: password(),
                },
              });
            }
          }}
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email()}
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password()}
            type="password"
            required
          />
          <button>{isSignUp() ? "Sign Up" : "Submit"}</button>
        </form>
      </div>
      <button
        onClick={() => (document.location.href = "/api/auth/google/oauth")}
      >
        Google
      </button>
    </main>
  );
}
