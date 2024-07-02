import { Hono } from "hono";
import { authMiddleware } from '~/backend/middleware/auth';
import { THonoType } from '~/backend';
import { db } from "~/backend/db";
import { noteTable } from "~/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { NoteSchema } from "~/schema/NoteSchema";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const notes = new Hono<THonoType>()
  .get('/note', async (c) => {
    const user = c.get('user')
    const res = await db.select().from(noteTable).where(eq(noteTable.userId, user?.id ?? ''))
    return c.json({
      data: res.map(({ id, noteContent, noteTitle }) => ({ id, noteContent, noteTitle }))
    })
  }).put('/note', zValidator('json', NoteSchema), async (c) => {
    const { id, noteContent, noteTitle } = c.req.valid('json')
    const user = c.get('user')
    try {
      await db.update(noteTable)
        .set({ noteContent, noteTitle })
        .where(and(eq(noteTable.id, id), eq(noteTable.userId, user?.id ?? '')))
      return c.json({ message: 'Success' })
    } catch (e) {
      throw new HTTPException(500, { message: 'Something went wrong !' })
    }
  }).post('/note', zValidator('json', NoteSchema), async (c) => {
    const { noteContent, noteTitle } = c.req.valid('json')
    const user = c.get('user')
    try {
      await db.insert(noteTable)
        .values({
          id: new Date().getMilliseconds().toString(),
          noteContent, noteTitle,
          userId: user?.id ?? ''
        })
      return c.json({ message: 'Success' })
    } catch (e) {
      throw new HTTPException(500, { message: 'Something went wrong !' })
    }
  }).delete('/note', zValidator('json', z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid('json')
    const user = c.get('user')
    try {
      await db
        .delete(noteTable)
        .where(and(eq(noteTable.id, id), eq(noteTable.userId, user?.id ?? '')))
      return c.json({ message: 'Success' })
    } catch (e) {
      throw new HTTPException(500, { message: 'Something went wrong !' })
    }
  })
