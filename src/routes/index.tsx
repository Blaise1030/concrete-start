import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Icon } from "@iconify-icon/solid";
import { createSignal } from "solid-js";

export default function Home() {
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
        <AuthenticationForm />
      </section>
    </div>
  );
}

function AuthenticationForm() {
  const [isLogin, setIsLogin] = createSignal(true);
  return (
    <>
      <div class="p-2 md:p-8 top-0 right-0 fixed">
        <Button variant={"link"} onClick={() => setIsLogin((a) => !a)}>
          {isLogin() ? "Register" : "Sign In"}
        </Button>
      </div>
      <div class="mx-auto max-w-sm w-full flex flex-col space-y-4 ">
        <header class="flex flex-col">
          <h2 class="font-bold text-2xl">
            {isLogin() ? "Welcome Back!" : "Join Us!"}
          </h2>
          <p class="text-muted-foreground">
            {isLogin() ? "Log In to Your Account" : "Create Your Free Account"}
          </p>
        </header>
        <Input class="bg-background" placeholder="abc@email.com" />
        <Input class="bg-background" placeholder="P@ssw0rd" type="password" />
        <Button>{isLogin() ? "Sign In" : "Register"}</Button>
        <div class="pb-2">
          <div class="border-b items-center justify-center flex">
            <div class="text-xs text-muted-foreground w-fit -mb-[10px] bg-background px-2">
              OR CONTINUE WITH
            </div>
          </div>
        </div>
        <Button variant={"outline"} class="bg-background">
          <Icon icon="mdi:google" class="mr-2" />
          Google
        </Button>
      </div>
    </>
  );
}
// Join Us! Create Your Free Account
