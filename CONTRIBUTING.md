# Contributing

Thanks for helping with CoziCraft.

## Content Changes

- Edit markdown under `content/`.
- Keep the `CoziCraft` spelling exact.
- Keep pages short, factual, and easy to review.
- Do not add private staff notes or secrets.
- Use pull requests when a change affects rules, store copy, or player expectations.

## Code Changes

Before opening or merging a change, run:

```bash
npm run lint
npm run typecheck
npm run test:unit -- --run
npm run generate
```

For UI changes, run:

```bash
npm run test:e2e -- --project chromium tests/cozicraft.spec.ts
```

## Public Repository Safety

This repo may become public. Assume everything committed here can be read by players.

Do not commit:

- API keys
- Tebex secrets
- Discord tokens
- Staff-only moderation notes
- Private emails or account details
- Unreviewed monetization promises
