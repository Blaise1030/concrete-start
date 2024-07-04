import {Icon} from "@iconify-icon/solid";
import {A} from "@solidjs/router";
import BackgroundPattern from "~/components/common/background-pattern";
import {Button, buttonVariants} from "~/components/ui/button";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";
import {cn} from "~/lib/utils";

const GITHUB_LINK = "https://github.com/Blaise1030/concrete-start";

export function HeroSection() {
  const [_, copyToClipboard] = useCopyToClipboard();

  return (
    <section class="max-w-screen-xl isolate relative w-full mx-auto slide-in-from-bottom-10 animate-in duration-500 fade-in py-24 px-8">
      <BackgroundPattern />
      <div class="flex flex-col gap-4 items-center transition-none justify-center">
        <h1 class="text-balance text-center tracking-tighter bg-gradient-to-tr from-primary/70 via-primary to-primary/60 bg-clip-text font-bold text-transparent text-5xl md:text-6xl">
          This is a concrete start
        </h1>
        <p class="text-muted-foreground text-md md:text-lg lg:text-xl max-w-2xl text-center">
          A Solid Start Authentication starter template (email & OAuth).
          Includes Lucia, Drizzle, HonoJS, tailwindcss and solid-ui
        </p>
        <div class="flex gap-4">
          <Button
            onClick={() =>
              copyToClipboard(
                "git clone https://github.com/Blaise1030/concrete-start.git"
              )
            }
          >
            Start building
          </Button>
          <A
            href={GITHUB_LINK}
            target="_blank"
            class={cn("bg-background", buttonVariants({variant: "outline"}))}
          >
            <Icon icon={"octicon:mark-github-16"} class="mr-2" />
            Github
          </A>
        </div>
      </div>
    </section>
  );
}
