# Notes

Use this folder for longer diary-style entries that belong to a post-it node.

## Add a writing entry

Open `content/notes/writing.ts` and add another object inside `writingNotes`:

```ts
{
  title: "A title for the note",
  date: "2026-06-20",
  body: "Write the note here.",
  tags: ["writing", "journal"]
}
```

The Writing post-it is already wired to `writingNotes`.

## Add entries for another topic

1. Copy `content/notes/_template.ts`.
2. Rename it, for example `art.ts`.
3. Rename `topicNotes` to something specific, for example `artNotes`.
4. Import it in `content/portfolio.ts`.
5. Add `entries: artNotes` to the matching object in `interestNodes`.
