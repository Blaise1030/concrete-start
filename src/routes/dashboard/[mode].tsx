import {Icon} from "@iconify-icon/solid";
import {
  createForm,
  reset,
  setValue,
  setValues,
  zodForm,
} from "@modular-forms/solid";
import {useNavigate, useParams, useSearchParams} from "@solidjs/router";
import {createResource, Show} from "solid-js";
import DashboardHeader from "~/components/module/dashboard/header";
import {Button} from "~/components/ui/button";
import {
  TextField,
  TextFieldLabel,
  TextFieldInput,
  TextFieldDescription,
  TextFieldTextArea,
} from "~/components/ui/text-field";
import {client} from "~/lib/api";
import {NoteSchema, TNoteSchema} from "~/schema/NoteSchema";

export default function DashboardDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const isCreateMode = () => params.mode === "create";
  const isEditMode = () => params.mode === "edit";

  const [form, {Form, Field}] = createForm<TNoteSchema>({
    validate: zodForm(NoteSchema.omit({id: true})),
  });

  const [data, actions] = createResource(
    async () => {
      if (!isEditMode()) return;
      const id = searchParams?.id;
      if (!id) return navigate("/dashboard");
      else {
        const response = await client().api.notes.note[":id"].$get({
          param: {id},
        });
        const data = await response.json();
        if (response.status !== 200) return navigate("/dashboard");
        setValues(form, data?.data[0] as TNoteSchema);
        return data;
      }
    },
    {
      ssrLoadFrom: "initial",
      onHydrated: () => actions.refetch(),
    }
  );

  async function onCreateNote({
    noteContent,
    noteTitle,
  }: {
    noteContent: string;
    noteTitle: string;
  }) {
    await client().api.notes.note.$post({
      json: {
        id: new Date().getMilliseconds().toString(),
        noteContent,
        noteTitle,
      },
    });
    navigate(-1);
  }

  async function onEditNote({
    noteContent,
    noteTitle,
  }: {
    noteContent: string;
    noteTitle: string;
  }) {
    const id = searchParams?.id;
    if (!id) return;
    await client().api.notes.note.$put({
      json: {
        noteContent,
        noteTitle,
        id,
      },
    });
    navigate(-1);
  }

  return (
    <div>
      <DashboardHeader />
      <div class="flex flex-col mx-auto p-4 max-w-screen-xl space-y-5 pt-8">
        <div class="flex flex-col">
          <Show when={isCreateMode()}>
            <p class="text-2xl font-bold">Create new notes</p>
          </Show>
          <Show when={isEditMode()}>
            <p class="text-2xl font-bold">Edit notes</p>
          </Show>
          <Show when={isCreateMode()}>
            <p class="text-base text-muted-foreground">
              Add a new note, enter the note title and content
            </p>
          </Show>
          <Show when={isEditMode()}>
            <p class="text-base text-muted-foreground">
              Edit your note title or content
            </p>
          </Show>
        </div>
        <Show when={!data.loading}>
          <Form
            class="flex flex-col space-y-4"
            onSubmit={async (v, e) => {
              e.preventDefault();
              if (isCreateMode()) await onCreateNote(v);
              else if (isEditMode()) await onEditNote(v);
            }}
          >
            <Field name="noteTitle">
              {(field, props) => (
                <TextField
                  class="flex flex-col space-y-2"
                  disabled={form.submitting || data.loading}
                >
                  <TextFieldLabel for="noteTitle">Content Title</TextFieldLabel>
                  <TextFieldInput
                    value={field.value}
                    {...props}
                    id="noteTitle"
                    type="text"
                    placeholder="Content Title"
                  />
                  <Show when={Boolean(field?.error)}>
                    <TextFieldDescription>{field?.error}</TextFieldDescription>
                  </Show>
                </TextField>
              )}
            </Field>
            <Field name="noteContent">
              {(field, props) => (
                <TextField
                  class="flex flex-col space-y-2"
                  disabled={form.submitting || data.loading}
                >
                  <TextFieldLabel for="noteContent">
                    Note Content
                  </TextFieldLabel>
                  <TextFieldTextArea
                    value={field.value}
                    {...props}
                    id="noteContent"
                    placeholder="Note content"
                  />
                  <Show when={Boolean(field?.error)}>
                    <TextFieldDescription>{field?.error}</TextFieldDescription>
                  </Show>
                </TextField>
              )}
            </Field>
            <Button
              class="w-fit"
              type="submit"
              disabled={form.submitting || data?.loading}
            >
              <Show when={Boolean(form.submitting || data?.loading)}>
                <Icon icon={"lucide:loader-circle"} class="mr-2 animate-spin" />
              </Show>
              Continue
            </Button>
          </Form>
        </Show>
      </div>
    </div>
  );
}
