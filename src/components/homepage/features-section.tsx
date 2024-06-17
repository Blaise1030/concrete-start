import { Icon } from "@iconify-icon/solid";
import { Index, Show } from "solid-js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";

export default function FeaturesSection(props: { title: string }) {
  return (
    <Carousel class="w-full flex flex-col space-y-4 py-12">
      <div class="flex justify-between items-center max-w-7xl mx-auto w-full px-6 py-2">
        <p class="md:text-2xl text-xl font-semibold">{props.title}</p>
        <div class="md:flex flex-row space-x-2 hidden">
          <CarouselPrevious class="relative translate-x-0 translate-y-0 left-0 right-0 top-0 rounded-sm" />
          <CarouselNext class="relative translate-x-0 translate-y-0 left-0 right-0 top-0 rounded-sm" />
        </div>
      </div>
      <CarouselContent class="max-w-7xl mx-auto">
        <Index
          each={[
            {
              title: "Solid Start",
              description: "The SolidJS Framework for Production",
              image: "/logo/solid-start.svg",
            },
            {
              title: "Solid JS",
              description:
                "Simple and performant reactivity for building user interfaces.",
              icon: "tabler:brand-solidjs",
            },
            {
              title: "Lucia Auth",
              description:
                "Credential authentication with password and email & OAuth",
              icon: "simple-icons:lucia",
            },
            {
              title: "Drizzle ORM",
              description: "TypeScript ORM that is production ready",
              icon: "simple-icons:drizzle",
            },
            {
              title: "Turso Database",
              description: "SQLite for Production",
              icon: "simple-icons:turso",
            },
            {
              title: "TypeSafe Backend",
              description:
                "Preserve type safety from backend to frontend with tRPC",
              icon: "devicon-plain:trpc",
            },
            {
              title: "Tailwindcss",
              description:
                "Simple and elegant UI components built with Tailwind CSS",
              icon: "simple-icons:tailwindcss",
            },
            {
              title: "Solid UI",
              description:
                "UI toolkit for building accessible web apps and design systems with SolidJS",
              icon: "simple-icons:shadcnui",
            },
          ]}
        >
          {(item) => (
            <CarouselItem class="fit-content max-w-xs md:max-w-sm select-none">
              <div class="p-2">
                <Card class="shadow-md aspect-[4/5] flex flex-col">
                  <CardHeader>
                    <CardTitle>{item().title}</CardTitle>
                  </CardHeader>
                  <CardContent class="flex-grow flex items-center  justify-center p-6">
                    <Show when={item().image}>
                      <img
                        class="brightness-0 dark:brightness-[400] grayscale w-28 h-28"
                        src={item().image}
                        alt="image"
                      />
                    </Show>
                    <Show when={item().icon}>
                      <Icon
                        height={96}
                        icon={item().icon || ""}
                        class="text-primary"
                      />
                    </Show>
                  </CardContent>
                  <CardFooter class="text-muted-foreground">
                    {item().description}
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          )}
        </Index>
      </CarouselContent>
    </Carousel>
  );
}
