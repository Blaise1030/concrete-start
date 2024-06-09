import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Home() {
  return (
    <div class="w-screen h-screen flex flex-row">
      <section class="bg-primary h-full w-[50%] lg:block hidden">
        <div class="flex flex-col text-background mx-auto sm:p-6 md:p-8 h-full">
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
      <section class="bg-background h-full w-[50%] flex items-center">
        <div class="mx-auto max-w-md w-full flex flex-col space-y-4">
          <header class="flex flex-col space-y-2">
            <h2>Sign In</h2>
          </header>
          <Input placeholder="abc@email.com" />
          <Input placeholder="P@ssw0rd" />
          <Button>Sign In</Button>

          <Button variant={"outline"}>Google</Button>
        </div>
      </section>
    </div>
  );
}
