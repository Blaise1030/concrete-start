import {Icon} from "@iconify-icon/solid";
import {For, createResource, createSignal} from "solid-js";
import {Link} from "~/components/link";
import {Button} from "~/components/ui/button";
import {Card} from "~/components/ui/card";
import {client} from "~/lib/api";

export default function Dashboard() {
  const [isLoading, setIsLoading] = createSignal(false);
  const [data, actions] = createResource(
    async () => {
      const response = await client().api.notes.note.$get();
      return await response.json();
    },
    {
      ssrLoadFrom: "initial",
      onHydrated: () => {
        actions.refetch();
      },
    }
  );

  async function addContent() {
    setIsLoading(true);
    await client().api.notes.note.$post({
      json: {
        id: new Date().getMilliseconds().toString(),
        noteContent:
          "Hello What is this title What is this title What is this title What is this title What is this title What is this title What is this title",
        noteTitle: "What is this title",
      },
    });
    await actions.refetch();
    setIsLoading(false);
  }

  async function deleteContent(id: string) {
    setIsLoading(true);
    await client().api.notes.note.$delete({json: {id}});
    await actions.refetch();
    setIsLoading(false);
  }

  return (
    <>
      <header class="sticky top-0 left-0 z-10">
        <div>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </header>
      <main class="max-w-screen-xl mx-auto gap-4 flex flex-col">
        <div class="flex flex-row">
          <Button onClick={addContent}>
            <Icon icon={"lucide:plus"} class="mr-1" />
            Add new notes
          </Button>
        </div>
        <div class="grid grid-cols-3 gap-4" ref={parent}>
          <For each={data()?.data || []}>
            {(item) => {
              return (
                <Card class="flex flex-col justify-between items-start gap-2 p-4 group">
                  <p class="text-lg font-bold">{item.noteTitle}</p>
                  <p class="text-sm text-muted-foreground">
                    {item.noteContent}
                  </p>
                  <div class="gap-2 ms-auto group-hover:opacity-100 flex opacity-0 transition-all duration-100">
                    <Button variant={"secondary"} size={"icon-md"}>
                      <Icon icon={"lucide:edit"} />
                    </Button>
                    <Button
                      onClick={() => deleteContent(item?.id)}
                      variant={"destructive"}
                      size={"icon-md"}
                    >
                      <Icon icon={"lucide:trash-2"} />
                    </Button>
                  </div>
                </Card>
              );
            }}
          </For>
        </div>
      </main>
    </>
  );
}
