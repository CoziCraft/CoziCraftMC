# CoziCraft Agent Blueprint

This repository powers the public CoziCraft Minecraft server site. Treat it as a long-lived community handoff project: simple enough for a non-specialist maintainer, but structured enough that future contributors can extend it safely.

## Product Direction

- Brand spelling is **CoziCraft**.
- Server address is `play.cozicraftmc.com`.
- Current Minecraft version is Java `26.2`.
- The site should feel like a polished Minecraft server portal with small-server charm.
- Avoid generic marketing copy and AI-sounding filler.
- Whimsy is welcome when it supports the player experience.

## Architecture Rules

- Keep v1 static-first.
- Content lives in `content/` markdown and is edited through GitHub.
- Do not add app auth in this repo for v1.
- Do not add a database for v1.
- Do not add server API routes unless there is a clear future requirement and a threat model.
- Do not call Tebex APIs from client code.
- Keep optional external URLs public-only and configurable through `NUXT_PUBLIC_*` values.
- Do not add a license file unless the project owner chooses an open-source license.

## Styling Rules

- Use Tailwind utilities for nearly all styling.
- Keep custom CSS limited to `app/assets/css/main.css` tokens, base styles, and tiny reusable utilities.
- Use Nuxt Icon with local icon packages for icons.
- Use Motion Vue sparingly for first-load and small interaction polish.
- Respect responsive layouts and avoid overlapping text.
- Prefer useful app pages over marketing landing sections.

## Content Rules

- Content collections are defined in `content.config.ts`.
- Wiki categories should stay aligned with `wikiCategories` in `app/utils/site.ts`.
- Keep public pages factual and concise.
- Store-related content must stay player-facing and reviewed against Minecraft monetization guidance.
- Never commit secrets, staff-only moderation notes, hidden Tebex IDs, webhook secrets, or private Discord links.
- `public/sitemap.xml` is static in v1. Update it when adding or renaming public routes.

## Test And Verification

Run these before handing off meaningful changes:

```bash
npm run lint
npm run typecheck
npm run test:unit -- --run
npm run generate
```

For UI/navigation/search changes, also run:

```bash
npx playwright install chromium
npm run test:e2e -- --project chromium tests/cozicraft.spec.ts
```

## Future-Friendly Paths

- GitHub editing is the v1 wiki workflow.
- Nuxt Studio can be evaluated later if editing through GitHub becomes too much friction.
- Tebex should start as an external link. Any API/webhook integration belongs in a server-side service with secret management.
- Railway can host the Nuxt server build with `npm run build` and `npm run start`, but the product should remain content-static unless a real dynamic requirement appears.
