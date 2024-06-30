import {Link} from "~/components/link";
import {Button, buttonVariants} from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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

export default function Home() {
  const [isHeaderOpen, setIsHeaderOpen] = createSignal(false);
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
                      href={""}
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
                  href="/dashboard"
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
          <div
            class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style="clip-path:polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div
            class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style="clip-path:polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div class="flex flex-col gap-4 items-center transition-none justify-center">
            <h1 class="text-balance text-center tracking-tighter bg-gradient-to-tr from-primary/70 via-primary to-primary/60 bg-clip-text font-bold text-transparent text-5xl md:text-6xl">
              This is a concrete start
            </h1>
            <p class="text-muted-foreground text-md md:text-lg lg:text-xl max-w-2xl text-center">
              A Solid Start Authentication starter template (email & OAuth).
              Includes Lucia, Drizzle, HonoJS, tailwindcss and solid-ui
            </p>
            <div class="flex gap-4">
              <Button>Start building</Button>
              <Button variant={"outline"} class="bg-background">
                <Icon icon={"octicon:mark-github-16"} class="mr-2" />
                Github
              </Button>
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
  const [index, setIndex] = createSignal();
  return (
    <section class="w-full">
      <Carousel
        opts={{loop: true}}
        plugins={[Autoplay({delay: 2000})]}
        onChange={console.log}
      >
        <CarouselContent class="sm:px-0">
          <For each={items}>
            {(item) => (
              <CarouselItem class="p-0 px-2 py-4 md:max-w-lg max-w-[250px]">
                <Card class="hover:shadow-lg duration-500 select-none aspect-[3/4] sm:aspect-video">
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
