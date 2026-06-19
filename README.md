# Bhakti Chokshi

A one-screen diary-desk portfolio: post-it nodes, journal notes, desk artifacts, and a personal mosaic of interests.

## Edit Content

Most edits happen in `content/portfolio.ts`.

- `identity`: name, email, resume, tagline, center text.
- `socials`: footer links.
- `centerEntry`: the main diary note opened from the center card.
- `deskArtifacts`: decorative desk objects.
- `interestNodes`: post-it notes around the center.
- `content/notes`: longer diary-style entries attached to post-it notes.

To add a new post-it note, add one object to `interestNodes`:

```ts
{
  id: "new-topic",
  label: "New Topic",
  color: "#ffe7a8",
  body: "The diary-entry text that opens in the side panel."
}
```

## Add A Writing Entry

Writing is already wired to `content/notes/writing.ts`.

Add a new object inside `writingNotes`:

```ts
{
  title: "What I noticed today",
  date: "2026-06-20",
  body: "Your note goes here.",
  tags: ["writing", "journal"]
}
```

For other topics, copy `content/notes/_template.ts` and follow `content/notes/README.md`.

## Do We Need npm?

Yes. This is a Next.js app, so `npm` installs dependencies and runs the local dev server/build scripts. You only need it for development and deployment workflows, not for editing text files.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## GitHub Pages

This site uses Next.js static export. You do not need to keep a handwritten `index.html` in the repo root.

When you run:

```bash
npm run build
```

Next generates the static site in `out/`, including:

```text
out/index.html
```

The GitHub Actions workflow in `.github/workflows/pages.yml` builds the site and deploys `out/` to Pages.

In GitHub repo settings:

1. Go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.

Keep `out/` ignored. Do not commit generated build output.
