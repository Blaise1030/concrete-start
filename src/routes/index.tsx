import {Link} from "~/components/link";
import {Button, buttonVariants} from "~/components/ui/button";
import {Card, CardTitle} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuDescription,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLabel,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import Autoplay from "embla-carousel-autoplay";
import {cn} from "~/lib/utils";
import {SSRPortal} from "~/components/common/ssr-portal";
import {For, Show, createSignal} from "solid-js";
import {Icon} from "@iconify-icon/solid";
import {ModeToggle} from "~/components/common/mode-toggle";
import {A} from "@solidjs/router";
import BackgroundPattern from "~/components/common/background-pattern";
import useCopyToClipboard from "~/hooks/useCopyToClipboard";

const items = [
  {
    title: "Solid Start",
    description: "The SolidJS Framework for Production",
    href: "https://start.solidjs.com/",
  },
  {
    title: "Solid JS",
    description:
      "Simple and performant reactivity for building user interfaces.",
    icon: "tabler:brand-solidjs",
    href: "https://www.solidjs.com/",
  },
  {
    title: "Lucia Auth",
    description: "Credential authentication with password and email & OAuth",
    icon: "simple-icons:lucia",
    href: "https://lucia-auth.com/",
  },
  {
    title: "Drizzle ORM",
    description: "TypeScript ORM that is production ready",
    icon: "simple-icons:drizzle",
    href: "https://orm.drizzle.team/",
  },
  {
    title: "Turso Database",
    description: "SQLite for Production",
    icon: "simple-icons:turso",
    href: "https://turso.tech/",
  },
  {
    title: "Hono",
    description:
      "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime",
    icon: "simple-icons:hono",
    href: "https://hono.dev/",
  },
  {
    title: "Tailwindcss",
    description: "Simple and elegant UI components built with Tailwind CSS",
    icon: "simple-icons:tailwindcss",
    href: "https://tailwindcss.com/",
  },
  {
    title: "Solid UI",
    description:
      "UI toolkit for building accessible web apps and design systems with SolidJS",
    icon: "simple-icons:shadcnui",
    href: "https://www.solid-ui.com/",
  },
];

const GITHUB_LINK = "https://github.com/Blaise1030/concrete-start";

export default function Home() {
  const [isHeaderOpen, setIsHeaderOpen] = createSignal(false);
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  return (
    <>
      <SSRPortal>
        <div
          class={cn(
            "fixed top-0 left-0 w-full z-10 flex duration-200 transition-all",
            isHeaderOpen() && "bg-background"
          )}
        >
          <div class="max-w-screen-xl mx-auto flex w-full px-4 py-2">
            <Link
              href="/"
              class="font-bold text-lg tracking-tighter leading-9 mr-auto"
            >
              ⌘ Acme.
            </Link>
            <NavigationMenu class="hidden md:flex" onOpen={setIsHeaderOpen}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Features
                  <NavigationMenuIcon />
                </NavigationMenuTrigger>
                <NavigationMenuContent class="max-h-[calc(100vh-52px)] overflow-auto">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <For each={items}>
                      {(item) => (
                        <NavigationMenuLink
                          href={item?.href}
                          class="col-span-1"
                          target="_blank"
                        >
                          <NavigationMenuLabel>
                            <Icon
                              icon={"ion:link"}
                              class="leading-[16px] mr-2"
                            />
                            {item?.title}
                          </NavigationMenuLabel>
                          <NavigationMenuDescription>
                            {item?.description}
                          </NavigationMenuDescription>
                        </NavigationMenuLink>
                      )}
                    </For>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Documentation
                  <NavigationMenuIcon />
                </NavigationMenuTrigger>
                <NavigationMenuContent class="max-h-[calc(100vh-52px)] overflow-auto">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <NavigationMenuLink
                      href={"https://nitro.unjs.io/deploy"}
                      class="col-span-1"
                      target="_blank"
                    >
                      <NavigationMenuLabel>Deployment</NavigationMenuLabel>
                      <NavigationMenuDescription>
                        Guide to deploy your application
                      </NavigationMenuDescription>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={GITHUB_LINK}
                  target="_blank"
                  class={buttonVariants({variant: "ghost", size: "sm"})}
                >
                  Github
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenu>

            <div class="ml-auto flex gap-2 items-center">
              <ModeToggle />
              <Link
                href="/dashboard"
                class={cn(
                  buttonVariants({size: "sm", variant: "secondary"}),
                  "h-8"
                )}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </SSRPortal>
      <main class="w-full  space-y-2 flex flex-col justify-center relative min-h-screen">
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
                class={cn(
                  "bg-background",
                  buttonVariants({variant: "outline"})
                )}
              >
                <Icon icon={"octicon:mark-github-16"} class="mr-2" />
                Github
              </A>
            </div>
          </div>
        </section>
        <FeatureSection />
      </main>
      <FooterSection />
    </>
  );
}

function FooterSection() {
  return (
    <footer class="w-full bg-secondary/10 border-t">
      <div class="max-w-screen-xl mx-auto p-4 text-xs text-muted-foreground text-center">
        Built with care by
        <Link
          href="https://blaise.deno.dev/"
          target="_blank"
          class={cn(
            buttonVariants({variant: "link"}),
            "h-fit p-0 text-xs ml-1"
          )}
        >
          Blaise
        </Link>
        , 2024
      </div>
    </footer>
  );
}

function FeatureSection() {
  return (
    <section class="w-full">
      <Carousel opts={{loop: true}} plugins={[Autoplay({delay: 2000})]}>
        <CarouselContent class="sm:px-0">
          <For each={items}>
            {(item) => (
              <CarouselItem class="p-0 px-2 py-4 md:max-w-lg max-w-[250px]">
                <Card class="hover:shadow-lg duration-500 select-none aspect-[3/4] sm:aspect-video bg-card/30 backdrop-blur">
                  <div class="flex flex-col p-4 justify-between space-y-8 h-full">
                    <CardTitle>{item.title}</CardTitle>
                    <div class="flex items-center justify-center">
                      <Show when={item.title === "Solid Start"}>
                        <p class="leading-[80px] font-bold text-2xl text-muted-foreground">
                          Solid<span class="text-blue-400">Start</span>
                        </p>
                      </Show>
                      <Show when={item.icon}>
                        <Icon
                          height={80}
                          icon={item.icon || ""}
                          class="text-muted-foreground"
                        />
                      </Show>
                    </div>
                    <p class="text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
