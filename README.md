# CoziCraft MC

CoziCraft MC is the public site for **CoziCraft**, a Minecraft Java community server.

The v1 site is static-first: content lives in markdown, wiki edits happen through GitHub, and the app does not include auth, databases, secret server APIs, or Tebex API calls.

## Server Details

- Server address: `play.cozicraftmc.com`
- Minecraft version: Java `1.21.11`
- Game/community name: `CoziCraft`

## Stack

- Nuxt 4
- Vue 3
- Nuxt Content 3
- Tailwind CSS 4
- Motion Vue through `motion-v`
- Nuxt Icon
- Vitest and Playwright

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run test:unit -- --run
npm run generate
```

Run the browser smoke spec:

```bash
npx playwright install chromium
npm run test:e2e -- --project chromium tests/cozicraft.spec.ts
```

## Content Editing

Public content is stored in `content/`:

- `content/pages/` for standalone pages such as Play, Rules, Store, and Contact.
- `content/wiki/` for editable wiki pages.
- `content/faq/` for the FAQ page.
- `content/news/` for dated updates.

For v1, edit content through GitHub commits or pull requests. Keep private moderation notes, API keys, Tebex secrets, Discord tokens, and staff-only process details out of this repository.

## Deployment

The production site uses GitHub Pages. A push to `master` runs the full CI checks, generates the static site, and deploys `.output/public` through GitHub Actions.

You can generate the same static output locally:

```bash
npm run generate
```

The GitHub Pages deployment uses `https://cozicraftmc.com` as the public site URL. Configure these optional public repository variables under **Settings → Secrets and variables → Actions → Variables**:

- `NUXT_PUBLIC_DISCORD_URL`
- `NUXT_PUBLIC_TEBEX_STORE_URL`
- `NUXT_PUBLIC_CONTACT_URL`

Optional public environment variables are listed in `.env.example`. They are safe public URLs only; do not add secrets to this static site.

## Future Work

- Add real server screenshots or art assets.
- Add a configured Discord link.
- Add a configured Tebex store link.
- Consider Nuxt Studio or another controlled editing workflow if GitHub editing becomes too hard.
- Keep any future Tebex API/webhook integration server-side and secret-managed.
