# Security Policy

CoziCraft MC is currently a static-first public site. It should not contain secrets, app auth, private moderation workflows, or server-side purchase handling.

## Reporting

Use the contact link configured for the site or open a private maintainer conversation if one is available. Do not post exploitable details in a public issue.

## Maintainer Guidance

- Keep secrets out of `.env.example`, markdown, screenshots, and docs.
- Use only `NUXT_PUBLIC_*` values for public URLs.
- Do not add client-side Tebex API calls.
- Review dependencies before adding them.
- Keep CI checks passing before deploys.

## Dependency Notes

`npm audit` currently reports a high-severity `esbuild` advisory through Nuxt's Vite builder dependency path. The non-breaking `npm audit fix` path does not resolve it, and the forced fix suggests an invalid Nuxt downgrade. Do not force that change. Keep Nuxt updated, do not expose local dev servers to untrusted networks, and revisit the audit after Nuxt ships a compatible Vite builder update.
