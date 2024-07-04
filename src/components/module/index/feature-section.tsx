import {Icon} from "@iconify-icon/solid";
import Autoplay from "embla-carousel-autoplay";
import {For, Show} from "solid-js";
import {Card, CardTitle} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import {featureItems} from "./features";

export function FeatureSection() {
  return (
    <section class="w-full">
      <Carousel opts={{loop: true}} plugins={[Autoplay({delay: 2000})]}>
        <CarouselContent class="sm:px-0">
          <For each={featureItems}>
            {(item) => (
              <CarouselItem class="p-0 px-2 py-4 md:max-w-lg max-w-[250px]">
                <Card class="hover:shadow-lg duration-500 select-none aspect-[3/4] sm:aspect-video bg-card/30 backdrop-blur">
                  <div class="flex flex-col p-4 justify-between space-y-8 h-full">
                    <CardTitle>{item.title}</CardTitle>
                    <div class="flex items-center justify-center">
                      <Show when={item.title === "Solid Start"}>
                        <p class="leading-[80px] font-bold text-2xl text-muted-foreground">
                          Solid<span class="text-blue-400">Start</span>
                        </p>
                      </Show>
                      <Show when={item.icon}>
                        <Icon
                          height={80}
                          icon={item.icon || ""}
                          class="text-muted-foreground"
                        />
                      </Show>
                    </div>
                    <p class="text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
