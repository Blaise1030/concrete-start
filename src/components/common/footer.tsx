import {cn} from "~/lib/utils";
import {Link} from "../link";
import {buttonVariants} from "../ui/button";

export function FooterSection() {
  return (
    <footer class="w-full bg-secondary/10 border-t">
      <div class="max-w-screen-xl mx-auto p-4 text-xs text-muted-foreground text-center">
        Built with care by
        <Link
          href="https://blaise.deno.dev/"
          target="_blank"
          class={cn(
            buttonVariants({variant: "link"}),
            "h-fit p-0 text-xs ml-1"
          )}
        >
          Blaise
        </Link>
        , 2024
      </div>
    </footer>
  );
}
