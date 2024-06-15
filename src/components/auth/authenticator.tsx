import { createForm, zodForm } from "@modular-forms/solid";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Show, createSignal } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { cn } from "~/lib/utils";
import { api } from "~/lib/api";
import { z } from "zod";
import { A, useLocation } from "@solidjs/router";
import { Card } from "../ui/card";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "You password must have 8 characters or more."),
});

export default function Home() {
  const location = useLocation();
  const [isLogin, setIsLogin] = createSignal(true);
  const [loginForm, { Form, Field }] = createForm<z.infer<typeof LoginSchema>>({
    validate: zodForm(LoginSchema),
  });

  const onSubmit = async (item: z.infer<typeof LoginSchema>) => {
    if (isLogin()) await api.auth.signin.mutate(item);
    else await api.auth.signup.mutate(item);
    window.location.href =
      new URLSearchParams(location.query).get("callback") || "/";
  };

  return (
    <div class="w-screen h-screen flex flex-row relative overflow-hidden isolate">
      <header class="fixed top-0 left-0 p-6 px-4 md:px-6 py-4 w-full">
        <h1 class="text-xl tracking-tighter font-semibold w-full text-center">
          <A href="/">⌘</A>
        </h1>
      </header>
      <div class="mx-auto max-w-sm w-full justify-center flex flex-col p-2">
        <div class="flex flex-col space-y-4 p-4">
          <div class="flex flex-col items-center text-center">
            <h2 class="font-bold text-2xl">
              {isLogin() ? "Welcome back" : "Join Us!"}
            </h2>
            <p class="text-muted-foreground">
              {isLogin()
                ? "Log In to Your Account"
                : "Create Your Free Account"}
            </p>
          </div>
          <br />
          <Form class="flex flex-col space-y-2" onSubmit={onSubmit}>
            <Field name="email">
              {(field, props) => (
                <div>
                  <Input
                    disabled={loginForm.submitting}
                    placeholder="abc@email.com"
                    {...props}
                    class={cn(
                      "bg-background",
                      field.error &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <Show when={field.error}>
                    <Label class="text-destructive">{field.error}</Label>
                  </Show>
                </div>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <div>
                  <Input
                    disabled={loginForm.submitting}
                    placeholder="P@ssw0rd"
                    type="password"
                    {...props}
                    class={cn(
                      "bg-background",
                      field.error &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <Show when={field.error}>
                    <Label class="text-destructive">{field.error}</Label>
                  </Show>
                </div>
              )}
            </Field>
            <Button type="submit" disabled={loginForm.submitting}>
              <Show when={loginForm.submitting}>
                <Icon icon={"lucide:loader-circle"} class="mr-1 animate-spin" />
              </Show>
              {isLogin() ? "Sign In" : "Register"}
            </Button>
          </Form>
          <span class="text-sm text-muted-foreground text-center">
            {!isLogin()
              ? "Already have an account ?"
              : "Don't have an account ?"}

            <Button
              disabled={loginForm.submitting}
              variant={"link"}
              size={"sm"}
              onClick={() => {
                setIsLogin((a) => !a);
              }}
            >
              {isLogin() ? "Register" : "Sign In"}
            </Button>
          </span>
          <div class="py-2">
            <div class="border-b items-center justify-center flex">
              <div class="text-xs text-muted-foreground w-fit -mb-[10px] bg-background px-2">
                OR CONTINUE WITH
              </div>
            </div>
          </div>
          <Button
            variant={"outline"}
            class="bg-background"
            disabled={loginForm.submitting}
          >
            <Icon icon="mdi:google" class="mr-2" />
            Google
          </Button>
        </div>
      </div>
    </div>
  );
}
