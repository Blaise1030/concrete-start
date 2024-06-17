import { Icon } from "@iconify-icon/solid";
import { useColorMode } from "@kobalte/core";
import { useNavigate } from "@solidjs/router";
import { api } from "~/lib/api";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
} from "../ui/dropdown-menu";

export function DashboardUserMenu() {
  const { setColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar class="size-6">
          <AvatarImage src="https://github.com/sek-consulting.png" />
          <AvatarFallback>EK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-[180px]">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => setColorMode("light")}>
          <Icon class="mr-2 size-4" icon={"lucide:sun"} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("dark")}>
          <Icon icon={"lucide:moon"} class="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("system")}>
          <Icon icon="lucide:laptop" class="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          color="destructive"
          onClick={async () => {
            await api.auth.signout.mutate();
            navigate("/");
          }}
        >
          <Icon icon="lucide:log-out" class="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
