import {useNavigate, type RouteSectionProps} from "@solidjs/router";
import {Show, createSignal} from "solid-js";
import {Link} from "~/components/link";
import {Button, buttonVariants} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";
import {Icon} from "@iconify-icon/solid";
import {
  TextFieldInput,
  TextField,
  TextFieldLabel,
  TextFieldDescription,
} from "~/components/ui/text-field";
import {createForm, zodForm} from "@modular-forms/solid";
import {LoginSchema, TLoginSchema} from "~/schema/LoginSchema";
import {client} from "~/lib/api";

export default function Login(props: RouteSectionProps) {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = createSignal(false);
  const [form, {Form, Field}] = createForm<TLoginSchema>({
    validate: zodForm(LoginSchema),
  });

  return (
    <main class="flex items-center h-screen">
      <div class="fixed top-4 left-0 w-full text-center p-2 z-10">
        <Link href="/">⌘</Link>
      </div>
      <div class="p-4 flex flex-col space-y-4 max-w-sm mx-auto w-full">
        <p class="text-center text-2xl font-bold">
          <Show when={!isSignUp()}>Welcome Back</Show>
          <Show when={isSignUp()}>Create an account</Show>
        </p>
        <Form
          class="flex flex-col space-y-4"
          onSubmit={async (a) => {
            const searchParams = props.location?.search;
            const red = new URLSearchParams(searchParams).get("path");
            let res = null;
            if (isSignUp()) res = await client.api.auth.signup.$post({json: a});
            else res = await client.api.auth.login.$post({json: a});
            if (res.status === 200) navigate(red ?? "/");
          }}
        >
          <Field name="email">
            {(field, props) => (
              <TextField
                class="flex flex-col space-y-1"
                disabled={form.submitting}
              >
                <TextFieldLabel for="email">Email</TextFieldLabel>
                <TextFieldInput
                  {...props}
                  type="email"
                  id="email"
                  placeholder="acme@mail.com"
                />
                <Show when={Boolean(field?.error)}>
                  <TextFieldDescription>{field?.error}</TextFieldDescription>
                </Show>
              </TextField>
            )}
          </Field>
          <Field name="password">
            {(field, props) => (
              <TextField
                class="flex flex-col space-y-1"
                disabled={form.submitting}
              >
                <TextFieldLabel for="password">Password</TextFieldLabel>
                <TextFieldInput
                  {...props}
                  type="password"
                  id="password"
                  placeholder="P@ssw0rd"
                />
                <Show when={Boolean(field?.error)}>
                  <TextFieldDescription>{field?.error}</TextFieldDescription>
                </Show>
              </TextField>
            )}
          </Field>
          <Button type="submit" disabled={form.submitting}>
            <Show when={Boolean(form.submitting)}>
              <Icon icon={"lucide:loader-circle"} class="mr-2 animate-spin" />
            </Show>
            Continue
          </Button>
        </Form>
        <div class="text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Show when={!isSignUp()}>Don't have an account ?</Show>
          <Show when={isSignUp()}>Already have an account ?</Show>
          <Button
            onClick={() => setIsSignUp((a) => !a)}
            class="p-0 text-xs"
            variant={"link"}
          >
            <Show when={!isSignUp()}>Create an account</Show>
            <Show when={isSignUp()}>Sign in now</Show>
          </Button>
        </div>
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
          <Icon icon={"bi:google"} class="mr-2" />
          Continue with Google
        </Link>
      </div>
    </main>
  );
}
