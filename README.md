# INVISIBLE // 2126

Anonymous single-page portfolio built and deployed for the A3 2126 Portfolio Challenge.

## Recognition

- A3 Web Design Challenge - 2126 Portfolio Category Winner
- 4th Overall, 198/300
- Live: https://invisible-2126--open-global-canister1.a3icp.com/
- Focus: Next.js, Tailwind, interaction design, responsive frontend, A3 deployment

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
