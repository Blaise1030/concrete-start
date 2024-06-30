import {Icon} from "@iconify-icon/solid";
import {useColorMode} from "@kobalte/core";

import {Button} from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function ModeToggle() {
  const {setColorMode} = useColorMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as={Button<"button">}
        variant="ghost"
        size="sm"
        class="w-8 h-8 px-0"
      >
        <Icon icon={"lucide:sun"} height={20} class="dark:hidden block" />
        <Icon icon={"lucide:moon"} height={20} class="dark:block hidden" />
        <span class="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setColorMode("light")}>
          <Icon icon={"lucide:sun"} height={20} class="mr-2" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("dark")}>
          <Icon icon={"lucide:moon"} height={20} class="mr-2" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("system")}>
          <Icon icon={"lucide:laptop"} height={20} class="mr-2" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
