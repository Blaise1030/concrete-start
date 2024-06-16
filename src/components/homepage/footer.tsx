import { For } from "solid-js";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";
import { A } from "@solidjs/router";
import { Icon } from "@iconify-icon/solid";

export default function Footer() {
  return (
    <footer class="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">
        Footer
      </h2>
      <div class="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-4">
            <A href="/">
              <p class="font-bold text-lg">⌘ Acme Inc.</p>
            </A>
            <p class="text-sm leading-6 text-muted-foreground">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div class="flex space-x-6">
              <For
                each={[
                  "ion:logo-facebook",
                  "ion:logo-instagram",
                  "ion:logo-twitter",
                  "ion:logo-youtube",
                ]}
              >
                {(icon) => (
                  <a
                    href="#"
                    class={cn("size-6 text-muted-foreground hover:opacity-70")}
                  >
                    <Icon icon={icon} />
                  </a>
                )}
              </For>
            </div>
          </div>
          <div class="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 xl:col-span-2 xl:mt-0">
            <For each={["Solutions", "Support", "Company", "Legal"]}>
              {(title) => (
                <div>
                  <h3 class="text-sm font-semibold leading-6">{title}</h3>
                  <ul role="list" class="mt-6 space-y-4">
                    <For
                      each={["Marketing", "Analytics", "Commerce", "Insights"]}
                    >
                      {(item) => (
                        <li>
                          <a
                            href="#"
                            class={cn(
                              buttonVariants({ variant: "link", size: "sm" }),
                              "h-fit p-0 text-muted-foreground"
                            )}
                          >
                            {item}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </div>
        </div>
        <div class="mt-16 border-t pt-8 sm:mt-20 lg:mt-24 border-border">
          <p class="text-xs leading-5 text-muted-foreground">
            &copy; 2024 Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
