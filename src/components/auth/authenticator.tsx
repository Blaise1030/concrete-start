import { createForm, zodForm } from "@modular-forms/solid";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Show, createSignal } from "solid-js";
import { Icon } from "@iconify-icon/solid";
import { cn } from "~/lib/utils";
import { api } from "~/lib/api";
import { z } from "zod";
import { useLocation } from "@solidjs/router";

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
    <div class="w-screen h-screen flex flex-row">
      <section class="bg-black h-full w-[50%] lg:block hidden relative border-e">
        <img
          src="/background.jpeg"
          alt="background"
          class="w-full h-full absolute object-cover opacity-50"
        />
        <div class="flex flex-col mx-auto sm:p-6 md:p-8 h-full absolute text-white">
          <header>
            <h1 class="text-xl tracking-tighter font-semibold">⌘ Acme Inc.</h1>
          </header>
          <div class="flex-grow" />
          <blockquote class="space-y-2">
            <p class="text-lg">
              “This library has saved me countless hours of work and helped me
              deliver stunning designs to my clients faster than ever before.”
            </p>
            <footer class="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </section>
      <section class="bg-background h-full lg:w-[50%] w-full flex items-center dark:bg-grid-white/5 bg-grid-black/5">
        <div class="p-2 md:p-8 top-0 right-0 fixed">
          <Button
            disabled={loginForm.submitting}
            variant={"link"}
            onClick={() => {
              setIsLogin((a) => !a);
            }}
          >
            {isLogin() ? "Register" : "Sign In"}
          </Button>
        </div>
        <div class="mx-auto max-w-sm w-full flex flex-col space-y-4 ">
          <header class="flex flex-col">
            <h2 class="font-bold text-2xl">
              {isLogin() ? "Welcome Back!" : "Join Us!"}
            </h2>
            <p class="text-muted-foreground">
              {isLogin()
                ? "Log In to Your Account"
                : "Create Your Free Account"}
            </p>
          </header>
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
          <div class="pb-2">
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
      </section>
    </div>
  );
}
