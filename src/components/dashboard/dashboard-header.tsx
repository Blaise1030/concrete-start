import { A, useNavigate } from "@solidjs/router";
import { Separator } from "~/components/ui/separator";
import { createSignal, createEffect, For } from "solid-js";
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
import { Icon } from "@iconify-icon/solid";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerFooter,
} from "~/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useColorMode } from "@kobalte/core";
import { Badge } from "~/components/ui/badge";
import { api } from "~/lib/api";
import { Input } from "~/components/ui/input";
import { DashboardUserMenu } from "./dashboard-user-menu";

const pages = [
  {
    title: "Applications",
    subpages: [
      { title: "Page Builder", description: "Build your pages", to: "/" },
      { title: "Ecommerce", description: "Ecommerce applications", to: "/" },
      { title: "Loyalty", description: "Keep your customers", to: "/" },
      {
        title: "Forms",
        description: "Build forms to collection information",
        to: "/",
      },
    ],
  },
  {
    title: "Settings",
    to: "/settings",
  },
];

export function DashboardHeader() {
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
          "fixed w-full top-0 left-0 z-30 transition-transform transition-color duration-300 py-1 border-b bg-background"
        )}
      >
        <div class="mx-auto relative flex justify-between items-center px-4 md:px-2 w-full max-w-screen-2xl">
          <div class="flex items-center space-x-6 w-full">
            <A href="/">
              <p class="font-bold text-lg">⌘</p>
            </A>
            <NavigationMenu
              orientation="horizontal"
              class="hidden md:flex flex-grow w-full"
            >
              <For each={pages}>
                {(page) => {
                  if (page.subpages)
                    return (
                      <NavigationMenuItem>
                        <NavigationMenuTrigger class="items-center">
                          <div>{page.title}</div>
                          <Icon icon={"lucide:chevron-down"} class="ms-0.5" />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent contentClass="max-w-screen-2xl">
                          <div class="grid grid-cols-3 gap-4">
                            <For each={page?.subpages}>
                              {(subpage) => (
                                <NavigationMenuLink href={subpage?.to}>
                                  <NavigationMenuLabel>
                                    {subpage?.title}
                                  </NavigationMenuLabel>
                                  <NavigationMenuDescription>
                                    {subpage?.description}
                                  </NavigationMenuDescription>
                                </NavigationMenuLink>
                              )}
                            </For>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  return (
                    <NavigationMenuTrigger as="a" href={page.to}>
                      {page.title}
                    </NavigationMenuTrigger>
                  );
                }}
              </For>
            </NavigationMenu>
          </div>
          <div class="hidden md:flex space-x-2 items-center">
            <NavigationMenu class="py-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger as="div" class="h-fit">
                  <Button
                    class="min-w-[200px] justify-start"
                    variant={"outline"}
                    size={"sm"}
                  >
                    <Icon icon={"lucide:search"} class="mr-2" />
                    <label>Search</label>
                    <Badge variant={"secondary"} class="ms-auto h-4 px-1">
                      ⌘K
                    </Badge>
                  </Button>
                </NavigationMenuTrigger>
                <NavigationMenuContent contentClass="max-w-screen-2xl pt-14">
                  <input
                    class="bg-none bg-transparent placeholder:text-primary/20 placeholder:dark:text-primary/15 outline-none border-t-0 border-l-0 border-r-0 rounded-none text-5xl w-full"
                    placeholder="Press 'Return' to Search "
                    onKeyDown={(e) => {
                      if (["ArrowLeft", "ArrowRight", " "].includes(e.key))
                        e.stopPropagation();
                    }}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
            <DashboardUserMenu />
          </div>
          <MobileDrawer />
        </div>
      </div>
    </SSRPortal>
  );
}

function MobileDrawer() {
  const navigate = useNavigate();
  const { setColorMode } = useColorMode();

  return (
    <Drawer>
      <DrawerTrigger as="div" class="md:hidden">
        <Button variant={"outline"} size={"icon"} class="h-9 w-9 ">
          <Icon icon={"radix-icons:hamburger-menu"} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div class="flex w-full px-4 items-center">
          <Icon icon={"lucide:search"} class="text-muted-foreground" />
          <Input
            class="focus-visible:ring-0 ps-2 focus-visible:ring-offset-0 focus-visible:border-x-0 border-none outline-none"
            placeholder="Search Item"
            autofocus={false}
          />
        </div>
        <Separator />
        <div class="grid grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden">
          <Accordion multiple={false} collapsible>
            <For each={pages}>
              {(item, index) => {
                if (item.subpages)
                  return (
                    <AccordionItem value={index.toString()}>
                      <AccordionTrigger class="text-sm px-4">
                        {item?.title}
                      </AccordionTrigger>
                      <AccordionContent class="p-0 flex flex-col space-y-2">
                        <For each={item?.subpages}>
                          {(subpage) => (
                            <A
                              href={subpage?.to || ""}
                              class="flex flex-col space-y-1 hover:bg-muted py-2 px-4 rounded-md"
                            >
                              <p class="text-sm font-medium">
                                {subpage?.title}
                              </p>
                              <p class="text-sm text-muted-foreground">
                                {subpage?.description}
                              </p>
                            </A>
                          )}
                        </For>
                      </AccordionContent>
                    </AccordionItem>
                  );
                else
                  return (
                    <Button
                      as="a"
                      href={item?.to || ""}
                      variant={"link"}
                      class="w-full text-start justify-start"
                    >
                      {item?.title}
                    </Button>
                  );
              }}
            </For>
          </Accordion>
        </div>
        <div class="px-4 flex flex-col space-y-2 pt-4">
          <p class="text-xs text-muted-foreground font-medium">Theme</p>
          <div class="grid grid-cols-3 gap-2">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setColorMode("light")}
            >
              <Icon class="mr-2 size-4" icon={"lucide:sun"} />
              <span>Light</span>
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setColorMode("dark")}
            >
              <Icon icon={"lucide:moon"} class="mr-2 size-4" />
              <span>Dark</span>
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setColorMode("system")}
            >
              <Icon icon="lucide:laptop" class="mr-2 size-4" />
              <span>System</span>
            </Button>
          </div>
        </div>

        <DrawerFooter>
          <Separator />
          <Button
            variant={"secondary"}
            onClick={async () => {
              await api.auth.signout.mutate();
              navigate("/");
            }}
          >
            Sign Out
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
