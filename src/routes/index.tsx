import { Button } from "~/components/ui/button";
import { A } from "@solidjs/router";
import { Card } from "~/components/ui/card";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLabel,
  NavigationMenu,
  NavigationMenuDescription,
} from "~/components/navigation-header";
import { createEffect, createSignal } from "solid-js";
import { cn } from "~/lib/utils";
import { useScrollDirection } from "~/hooks/useScrollDirection";
import { Portal } from "solid-js/web";
import { SSRPortal } from "~/components/ssr-portal";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <section class="relative isolate px-6 lg:px-8 h-screen text-center flex items-center ">
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
      <section class="w-full">
        <div class="mx-auto max-w-5xl flex flex-col space-y-4 text-center">
          <h1 class="text-4xl font-bold">Technologies</h1>
          <p class="text-md md:text-lg leading-1 md:leading-8 text-muted-foreground max-w-2xl mx-auto">
            This starter template is a guide to help you get started with Solid
            JS for large scale applications. Feel free to add or remove features
            to suit your needs.
          </p>
          <div class="w-full mx-auto grid grid-cols-3 gap-4">
            <Card class="p-4 bg-background">Hello</Card>
            <Card class="p-4 bg-background">Hello</Card>
            <Card class="p-4 bg-background">Hello</Card>
          </div>
        </div>
      </section>
      <section class="w-full">
        <div class="mx-auto max-w-5xl flex flex-col space-y-4 text-center">
          <h1 class="text-4xl font-bold">Technologies</h1>
          <p class="text-md md:text-lg leading-1 md:leading-8 text-muted-foreground max-w-2xl mx-auto">
            This starter template is a guide to help you get started with Solid
            JS for large scale applications. Feel free to add or remove features
            to suit your needs.
          </p>
          <div class="w-full mx-auto grid grid-cols-3 gap-4">
            <Card class="p-4 bg-background">Hello</Card>
            <Card class="p-4 bg-background">Hello</Card>
            <Card class="p-4 bg-background">Hello</Card>
          </div>
        </div>
      </section>
      <section class="w-full">
        <div class="mx-auto max-w-5xl flex flex-col space-y-4 text-center">
          <h1 class="text-4xl font-bold">Technologies</h1>
          <p class="text-md md:text-lg leading-1 md:leading-8 text-muted-foreground max-w-2xl mx-auto">
            This starter template is a guide to help you get started with Solid
            JS for large scale applications. Feel free to add or remove features
            to suit your needs.
          </p>
          <div class="w-full mx-auto grid grid-cols-3 gap-4">
            <Card class="p-4 bg-background">Hello</Card>
            <Card class="p-4 bg-background">Hello</Card>
            <Card class="p-4 bg-background">Hello</Card>
          </div>
        </div>
      </section>
    </>
  );
}

function NavigationBar() {
  const { scrollDirection } = useScrollDirection();
  const [isShown, setIsShown] = createSignal(true);

  createEffect(() => {
    if (scrollDirection() === "down" && isShown()) setIsShown((a) => !a);
    else if (scrollDirection() === "up" && !isShown()) setIsShown((a) => !a);
  });
  return (
    <SSRPortal>
      <div
        style={{ "padding-inline-end": "var(--scrollbar-width)" }}
        class={cn(
          "fixed w-full top-0 left-0 z-20 bg-background transition-transform duration-300",
          !isShown() ? "-translate-y-[100%]" : ""
        )}
      >
        <div class="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-1">
          <A href="/">
            <p class="font-bold text-lg">⌘</p>
          </A>
          <NavigationMenu orientation="horizontal">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="grid grid-cols-3 gap-4">
                  <NavigationMenuLink href="/docs">
                    <NavigationMenuLabel>Introduction</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Re-usable components. Built with Kobalte & corvu. Styled
                      with Tailwind CSS.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>

                  <NavigationMenuLink href="/docs/installation/overview">
                    <NavigationMenuLabel>Installation</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      How to install dependencies and structure your app.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>

                  <NavigationMenuLink href="/docs/dark-mode/overview">
                    <NavigationMenuLabel>Dark Mode</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Adding dark mode to your site.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div>
                  <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/introduction">
                    <NavigationMenuLabel>Introduction</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Build high-quality, accessible design systems and web
                      apps.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>

                  <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/getting-started">
                    <NavigationMenuLabel>Getting started</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      A quick tutorial to get you up and running with Kobalte.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/styling">
                    <NavigationMenuLabel>Styling</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Unstyled and compatible with any styling solution.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/animation">
                    <NavigationMenuLabel>Animation</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Use CSS keyframes or any animation library of your choice.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/polymorphism">
                    <NavigationMenuLabel>Polymorphism</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Customize behavior or integrate existing libraries.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="https://kobalte.dev/docs/changelog">
                    <NavigationMenuLabel>Changelog</NavigationMenuLabel>
                    <NavigationMenuDescription>
                      Kobalte releases and their changelogs.
                    </NavigationMenuDescription>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuTrigger
              as="a"
              href="https://github.com/kobaltedev/kobalte"
              target="_blank"
            >
              GitHub
            </NavigationMenuTrigger>
          </NavigationMenu>
          <Button
            variant={"link"}
            size={"sm"}
            onClick={() => (document.location.href = "/dashboard")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </SSRPortal>
  );
}
