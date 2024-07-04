import DashboardHeader from "~/components/module/dashboard/header";
import {For, Show, createResource, createSignal} from "solid-js";
import {Button} from "~/components/ui/button";
import {Card} from "~/components/ui/card";
import {Icon} from "@iconify-icon/solid";
import {client} from "~/lib/api";
import {FooterSection} from "~/components/common/footer";
import NotesCard from "~/components/module/dashboard/notes-card";
import {useNavigate} from "@solidjs/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export default function Dashboard() {
  const [isLoading, setIsLoading] = createSignal(false);
  const navigate = useNavigate();
  const [notesId, setNotesId] = createSignal<string | undefined>("");

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

  async function deleteContent(id: string) {
    setIsLoading(true);
    await client().api.notes.note.$delete({json: {id}});
    await actions.refetch();
    setNotesId(undefined);
    setIsLoading(false);
  }

  return (
    <>
      <DashboardHeader />
      <main class="max-w-screen-xl px-4 mx-auto gap-4 flex flex-col py-4">
        <div class="flex flex-col md:flex-row items-start gap-2 md:items-center justify-between">
          <div class="flex flex-col">
            <p class="text-2xl font-bold">Your Notes</p>
            <p class="text-muted-foreground">Manage your notes here</p>
          </div>
          <Button onClick={() => navigate("/dashboard/create")} size={"sm"}>
            <Icon icon={"lucide:plus"} class="mr-1" />
            Add new notes
          </Button>
        </div>
        <div class="min-h-screen">
          <Show when={data?.loading}>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={new Array(6)}>
                {() => (
                  <div class="aspect-video bg-muted rounded-md animate-pulse" />
                )}
              </For>
            </div>
          </Show>
          <Show when={!data?.loading && (data()?.data || []).length > 0}>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <For each={data()?.data || []}>
                {(item) => {
                  return (
                    <NotesCard
                      onEdit={() => navigate(`/dashboard/edit?id=${item?.id}`)}
                      onDeleteContent={() => setNotesId(item?.id)}
                      noteContent={item?.noteContent ?? ""}
                      noteTitle={item?.noteTitle ?? ""}
                    />
                  );
                }}
              </For>
            </div>
          </Show>
          <Show when={!data?.loading && (data()?.data || []).length === 0}>
            <div class="h-[50vh] border-2 border-dashed w-full rounded-lg flex items-center justify-center">
              <div class="flex flex-col items-center">
                <h1 class="font-bold text-xl">You have no notes</h1>
                <p class="text-muted-foreground">
                  To create one click the button below
                </p>
                <br />
                <Button
                  onClick={() => navigate("/dashboard/create")}
                  variant={"secondary"}
                  size={"sm"}
                >
                  <Icon icon={"lucide:plus"} class="mr-1" />
                  Add a new note
                </Button>
              </div>
            </div>
          </Show>
        </div>
      </main>
      <FooterSection />
      <Dialog open={Boolean(notesId())}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this note
            from our servers.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => setNotesId(undefined)}
              variant={"secondary"}
              disabled={isLoading()}
              size={"sm"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteContent(notesId() ?? "")}
              variant={"destructive"}
              disabled={isLoading()}
              size={"sm"}
            >
              <Show when={isLoading()}>
                <Icon icon="lucide:loader-circle" class="mr-1" />
              </Show>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
