import { z } from "zod";

type TNoteSchema = z.infer<typeof NoteSchema>;
const NoteSchema = z.object({
  id: z.string(),
  noteTitle: z.string().min(1, "Note title is required"),
  noteContent: z.string()
});


export { type TNoteSchema, NoteSchema }