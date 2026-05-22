# INVISIBLE // 2126

Anonymous single-page portfolio for the A3 2126 Portfolio Challenge.

## Run Locally

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Checks

```bash
bun run lint
bun run build
```

## Deployment

This is a static-friendly Next.js App Router page with no backend, database, auth, payments, external API requirement, or external font fetch.

For A3 static hosting:

- Install command: `bun install`
- Build command: `bun run build`
- Output directory: `public`

The build still emits the canonical Next static export to `out`, then mirrors it into `public` because A3's ICP deploy step reads assets from `public`.
