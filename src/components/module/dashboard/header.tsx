import {ModeToggle} from "~/components/common/mode-toggle";
import {Link} from "~/components/link";
import {buttonVariants} from "~/components/ui/button";

export default function DashboardHeader() {
  return (
    <header class="sticky p-2 border-b top-0 left-0 z-20 bg-background/50 backdrop-blur-xl">
      <div class="max-w-screen-xl px-4 mx-auto w-full flex justify-between items-center">
        <Link href="/dashboard" class="text-lg font-bold">
          ⌘ Acme.
        </Link>
        <div class="flex gap-4 items-center">
          <ModeToggle />
          <Link
            href="/api/auth/logout"
            class={buttonVariants({variant: "secondary", size: "sm"})}
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
