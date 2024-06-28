import {type RouteSectionProps} from "@solidjs/router";
import {Show, createSignal} from "solid-js";
import {Link} from "~/components/link";
import {Button, buttonVariants} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";
import {
  TextFieldInput,
  TextField,
  TextFieldLabel,
} from "~/components/ui/text-field";
import {client} from "~/utils/api";

export default function Login(props: RouteSectionProps) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isSignUp, setIsSignUp] = createSignal(false);
  const [hello, setHello] = createSignal();
  return (
    <main>
      <div class="p-4 flex flex-col space-y-2 max-w-sm mx-auto">
        <TextField>
          <TextFieldLabel for="email">Email</TextFieldLabel>
          <TextFieldInput type="email" id="email" placeholder="acme@mail.com" />
        </TextField>
        <TextField>
          <TextFieldLabel for="email">Password</TextFieldLabel>
          <TextFieldInput type="email" id="password" placeholder="P@ssw0rd" />
        </TextField>
        <Button>Submit</Button>
        <div class="w-full flex py-3 relative">
          <p class="absolute bg-background left-[50%] text-sm text-muted-foreground -translate-x-[50%] -translate-y-[50%] px-2">
            OR
          </p>
          <Separator />
        </div>
        <Link
          href="/api/auth/google/oauth"
          class={buttonVariants({variant: "outline"})}
        >
          Continue with Google
        </Link>
      </div>

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
      <Link href="/api/auth/google/oauth" class="bg-red-50">
        Google
      </Link>
      <Show when={hello()}>
        <Link href="/api/auth/logout">Logout</Link>
      </Show>
    </main>
  );
}
