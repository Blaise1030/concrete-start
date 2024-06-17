import { createSignal, JSX, splitProps, ValidComponent } from "solid-js";

import { PolymorphicProps } from "@kobalte/core";
import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu";

import { cn } from "~/lib/utils";

type NavigationMenuItemProps<T extends ValidComponent = "ul"> =
  NavigationMenuPrimitive.NavigationMenuItemProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const NavigationMenuItem = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, NavigationMenuItemProps<T>>
) => <NavigationMenuPrimitive.Menu modal {...props} />;

type NavigationMenuProps<T extends ValidComponent = "ul"> =
  NavigationMenuPrimitive.NavigationMenuRootProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const NavigationMenu = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, NavigationMenuProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuProps, [
    "class",
    "children",
  ]);
  return (
    <NavigationMenuPrimitive.Root
      onValueChange={(v) => {
        if (Boolean(v))
          document
            .getElementById("app")
            ?.setAttribute("class", "scale-[95%] duration-200 delay-200");
        else
          document
            .getElementById("app")
            ?.setAttribute("class", "scale-[100%] duration-200");
      }}
      class={cn(
        "group/menu flex w-max flex-1 list-none items-center justify-center data-[orientation=vertical]:flex-col [&>li]:w-full z-20 space-x-2",
        local.class
      )}
      {...others}
    >
      {local.children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
};

type NavigationMenuTriggerProps<T extends ValidComponent = "button"> =
  NavigationMenuPrimitive.NavigationMenuTriggerProps<T> & {
    class?: string | undefined;
  };

const NavigationMenuTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, NavigationMenuTriggerProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuTriggerProps, [
    "class",
  ]);
  return (
    <NavigationMenuPrimitive.Trigger
      class={cn(
        "group/trigger inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        local.class
      )}
      {...others}
    />
  );
};
const NavigationMenuIcon = () => {
  return (
    <NavigationMenuPrimitive.Icon aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="relative top-px ml-1 size-3 transition group-data-[expanded]/trigger:rotate-180 group-data-[orientation=vertical]/menu:-rotate-90 group-data-[orientation=vertical]/menu:group-data-[expanded]/trigger:rotate-90 duration-1000"
      >
        <path d="M6 9l6 6l6 -6" />
      </svg>
    </NavigationMenuPrimitive.Icon>
  );
};

type NavigationMenuViewportProps<T extends ValidComponent = "li"> =
  NavigationMenuPrimitive.NavigationMenuViewportProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const NavigationMenuViewport = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, NavigationMenuViewportProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuViewportProps, [
    "class",
    "children",
  ]);
  return (
    <div
      class={cn(
        "fixed left-0 top-0 w-screen flex justify-center [&_.presentation]:w-full [&_.presentation]:bg-black"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        {...others}
        class={cn(
          "origin-[var(--kb-menu-content-transform-origin)] -ms-2 relative h-screen w-screen overflow-hidden backdrop-filter from-1% bg-gradient-to-b from-popover via-popover/20 to-popover/0 backdrop-blur-xl text-popover-foreground data-[expanded]:animate-in animate-out fade-out data-[expanded]:fade-in ease-in ",
          local.class
        )}
      >
        {local.children}
      </NavigationMenuPrimitive.Viewport>
    </div>
  );
};

type NavigationMenuContentProps<T extends ValidComponent = "ul"> =
  NavigationMenuPrimitive.NavigationMenuContentProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
    contentClass?: string;
  };

const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: PolymorphicProps<T, NavigationMenuContentProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuContentProps, [
    "class",
    "children",
    "contentClass",
  ]);
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Content
        class={cn(
          "pointer-events-none absolute left-0 top-0 focus:outline-none data-[expanded]:pointer-events-auto w-screen z-30 overflow-hidden",
          "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
          "data-[orientation=horizontal]:data-[motion=from-start]:slide-in-from-top-52 data-[orientation=horizontal]:data-[motion=to-end]:slide-out-to-bottom-52",
          "data-[orientation=horizontal]:data-[motion=from-end]:slide-in-from-top-52 data-[orientation=horizontal]:data-[motion=to-start]:slide-out-to-bottom-52",
          local.class
        )}
        {...others}
      >
        <div
          class={cn("max-w-screen-xl px-2 py-4 mx-auto", local.contentClass)}
        >
          {local.children}
        </div>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
};

type NavigationMenuLinkProps<T extends ValidComponent = "a"> =
  NavigationMenuPrimitive.NavigationMenuItemProps<T> & {
    class?: string | undefined;
  };

const NavigationMenuLink = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, NavigationMenuLinkProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuLinkProps, [
    "class",
  ]);
  return (
    <NavigationMenuPrimitive.Item
      class={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        local.class
      )}
      {...others}
    />
  );
};

type NavigationMenuLabelProps<T extends ValidComponent = "div"> =
  NavigationMenuPrimitive.NavigationMenuItemLabelProps<T> & {
    class?: string | undefined;
  };

const NavigationMenuLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NavigationMenuLabelProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuLabelProps, [
    "class",
  ]);
  return (
    <NavigationMenuPrimitive.ItemLabel
      class={cn("text-sm font-medium leading-none", local.class)}
      {...others}
    />
  );
};

type NavigationMenuDescriptionProps<T extends ValidComponent = "div"> =
  NavigationMenuPrimitive.NavigationMenuItemDescriptionProps<T> & {
    class?: string | undefined;
  };

const NavigationMenuDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, NavigationMenuDescriptionProps<T>>
) => {
  const [local, others] = splitProps(props as NavigationMenuDescriptionProps, [
    "class",
  ]);
  return (
    <NavigationMenuPrimitive.ItemDescription
      class={cn("text-sm leading-snug text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuViewport,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLabel,
  NavigationMenuDescription,
};
