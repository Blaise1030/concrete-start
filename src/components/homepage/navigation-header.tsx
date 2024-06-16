import { A } from "@solidjs/router";
import { Separator } from "~/components/ui/separator";
import { createSignal, createEffect } from "solid-js";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLabel,
  NavigationMenuDescription,
} from "~/components/ui/navigation-header";
import { Button } from "~/components/ui/button";
import { SSRPortal } from "~/components/common/ssr-portal";
import { useScrollDirection } from "~/hooks/useScrollDirection";
import { cn } from "~/lib/utils";
import { DarkModeToggle } from "~/components/common/dark-mode-toggle";
import { Icon } from "@iconify-icon/solid";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "~/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useColorMode } from "@kobalte/core";

export function NavigationHeader() {
  const { scrollDirection, lastScrollY } = useScrollDirection();
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
          "fixed w-full top-0 left-0 z-20 transition-transform transition-color duration-300 py-1",
          !isShown() ? "-translate-y-[100%]" : "",
          lastScrollY() === 0
            ? ""
            : "bg-background border-b dark:border-border/45"
        )}
      >
        <div class="max-w-screen-xl mx-auto relative flex justify-between items-center px-5 md:px-4">
          <A href="/">
            <p class="font-bold text-lg w-[114px]">⌘</p>
          </A>
          <NavigationMenu orientation="horizontal" class="hidden md:flex">
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
          <MobileDrawer />
          <div class="hidden md:flex space-x-2">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => (document.location.href = "/dashboard")}
            >
              Sign In
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </SSRPortal>
  );
}

function MobileDrawer() {
  const { setColorMode } = useColorMode();

  return (
    <Drawer>
      <DrawerTrigger as="div" class="md:hidden">
        <Button variant={"outline"} size={"icon"} class="h-9 w-9 ">
          <Icon icon={"radix-icons:hamburger-menu"} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader />
        <div class="grid grid-cols-1 gap-2 px-4 overflow-y-auto">
          <Accordion multiple={false} collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent class="p-0 flex flex-col space-y-2">
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent class="p-0 flex flex-col space-y-2">
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
                <div class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md">
                  <p class="text-sm font-medium">Label</p>
                  <p class="text-sm text-muted-foreground">
                    This is the Description
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="px-4 flex flex-col space-y-2 pt-4">
          <p class="text-xs text-muted-foreground font-medium">Theme</p>
          <div class="grid grid-cols-3 gap-2">
            <Button variant={"outline"} onClick={() => setColorMode("light")}>
              <Icon class="mr-2 size-4" icon={"lucide:sun"} />
              <span>Light</span>
            </Button>
            <Button variant={"outline"} onClick={() => setColorMode("dark")}>
              <Icon icon={"lucide:moon"} class="mr-2 size-4" />
              <span>Dark</span>
            </Button>
            <Button variant={"outline"} onClick={() => setColorMode("system")}>
              <Icon icon="lucide:laptop" class="mr-2 size-4" />
              <span>System</span>
            </Button>
          </div>
        </div>

        <DrawerFooter>
          <Separator />
          <Button
            variant={"secondary"}
            onClick={() => (document.location.href = "/dashboard")}
          >
            Sign In
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
