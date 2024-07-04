import {Icon} from "@iconify-icon/solid";
import {For, createSignal} from "solid-js";
import {ModeToggle} from "~/components/common/mode-toggle";
import {SSRPortal} from "~/components/common/ssr-portal";
import {Link} from "~/components/link";
import {buttonVariants} from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLabel,
  NavigationMenuDescription,
} from "~/components/ui/navigation-menu";
import {cn} from "~/lib/utils";
import {featureItems} from "./features";

const GITHUB_LINK = "https://github.com/Blaise1030/concrete-start";

export function Header() {
  const [isHeaderOpen, setIsHeaderOpen] = createSignal(false);
  return (
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
                  <For each={featureItems}>
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
  );
}
