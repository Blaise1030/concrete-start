import {Icon} from "@iconify-icon/solid";
import {useNavigate} from "@solidjs/router";
import {Button} from "~/components/ui/button";
import {Card} from "~/components/ui/card";

export default function NotesCard(props: {
  noteTitle: string;
  noteContent: string;
  onDeleteContent: () => void;
  onEdit: () => void;
}) {
  return (
    <Card class="flex flex-col justify-between items-start gap-2 p-4 group h-fit">
      <p class="text-lg font-bold">{props.noteTitle}</p>
      <p class="text-sm text-muted-foreground">{props.noteContent}</p>
      <div class="gap-2 ms-auto group-hover:opacity-100 flex opacity-0 transition-all duration-100">
        <Button onClick={props.onEdit} variant={"secondary"} size={"icon-md"}>
          <Icon icon={"lucide:edit"} />
        </Button>
        <Button
          onClick={props.onDeleteContent}
          variant={"destructive"}
          size={"icon-md"}
        >
          <Icon icon={"lucide:trash-2"} />
        </Button>
      </div>
    </Card>
  );
}
