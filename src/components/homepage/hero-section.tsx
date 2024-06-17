import { BackgroundPattern } from "~/components/common/background-pattern";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section class="relative isolate overflow-visible px-6 lg:px-8 h-[60vh] md:h-[70vh] text-center flex items-center ">
      <BackgroundPattern />
      <div class="mx-auto max-w-2xl flex flex-col space-y-4 ">
        <h1 class="text-3xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-muted-foreground to-primary">
          This is a Concrete Start.
        </h1>
        <p class="text-md md:text-lg leading-1 md:leading-8 text-muted-foreground">
          A Solid Start Authentication starter template (email & OAuth).
          Includes Lucia, Drizzle, tRPC, tailwindcss and solid-ui
        </p>
        <div class="flex items-center justify-center gap-x-6">
          <Button>Get started</Button>
          <Button variant={"link"}>Learn more →</Button>
        </div>
      </div>
    </section>
  );
}
