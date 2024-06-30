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
import {For, Show} from "solid-js";
import {Icon} from "@iconify-icon/solid";

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
  return (
    <>
      <SSRPortal>
        <NavigationMenu class="fixed top-0 left-0 w-full bg-background border-b">
          <div class="flex w-full max-w-screen-xl items-center py-2 sm:py-1 px-4">
            <Link
              href="/"
              class="font-bold text-lg tracking-tighter mr-4 leading-9"
            >
              ⌘ Acme.
            </Link>
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
                          <Icon icon={"ion:link"} class="leading-[16px] mr-2" />
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
            <div class="ml-auto">
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
        </NavigationMenu>
      </SSRPortal>

      <main class="w-full space-y-2 h-screen flex flex-col justify-center">
        <FeatureSections />
        <section class="max-w-screen-xl mx-auto slide-in-from-bottom-10 animate-in duration-500 fade-in py-24 px-8">
          <div class="flex flex-col gap-4 items-center transition-none justify-center">
            <h1 class="text-balance tracking-tighter bg-gradient-to-tr from-primary/70 via-primary to-primary/60 bg-clip-text font-bold text-transparent dark:from-muted-foreground/10 dark:muted-foreground dark:muted-foreground/20 text-3xl md:text-5xl">
              This is a concrete start
            </h1>
            <p class="text-muted-foreground text-md md:text-lg lg:text-xl max-w-2xl text-center">
              Meet the system for modern product development. Streamline issues,
              projects, and product roadmaps.
            </p>
            <div class="flex gap-4">
              <Button>Start Building</Button>
              <Button variant={"outline"}>
                <Icon icon={"octicon:mark-github-16"} class="mr-2" />
                Github
              </Button>
            </div>
          </div>
        </section>
        <FeatureSections reverse />
      </main>
    </>
  );
}

function FeatureSections({reverse}: {reverse?: boolean}) {
  return (
    <section class="w-full skew-y-[-8deg]">
      <Carousel opts={{loop: true}} plugins={[Autoplay({delay: 2000})]}>
        <CarouselContent class="sm:px-0">
          <For each={reverse ? items : items.toReversed()}>
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
