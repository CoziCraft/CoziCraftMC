# CoziCraft Static Content Portal Design

Date: 2026-06-12
Status: Approved for implementation planning

## Summary

CoziCraft needs a fast, secure, static-first Nuxt site for a Minecraft Java community server. The site should feel like a polished server portal with small-server charm: friendly, readable, practical, and easy to hand off. The foundation should avoid auth, database work, payment logic, and runtime integrations until the project has a clear need for them.

The approved v1 direction is a static Nuxt 4 + Nuxt Content site where all content lives in this repository and is edited through GitHub pull requests or commits. The site will include a homepage, play/join page, wiki, FAQ, rules, store link, contact/links page, and news/updates. The public server connection is Java-only at `play.cozicraftmc.com`, currently for Java `26.2`.

## Goals

- Build a portable static site that can deploy through `npm run generate` to common static hosts.
- Keep wiki/content editing simple by using markdown in this repo.
- Give future maintainers and coding agents a strong `AGENTS.md` blueprint.
- Create a polished but approachable CoziCraft visual foundation.
- Provide generated content navigation and all-public-content search.
- Document safe future extension points for Tebex, admin editing, server status, and real screenshot assets.
- Treat the repository as potentially public from day one.

## Non-Goals

- No browser-based admin editor in v1.
- No app auth, OAuth, session handling, or protected content in v1.
- No live Minecraft server status/player-count calls in v1.
- No Tebex API, checkout, payment, or purchase fulfillment logic in v1.
- No separate wiki repository in v1.
- No Playwright or unit-test requirements in CI for v1.
- No license file in v1; public visibility should not be described as open-source reuse until a license is intentionally chosen.

## Technical Architecture

The site remains a Nuxt 4 app with Nuxt Content. The production target is static generation with `npm run generate`, which should produce deployable static output without requiring a Node server at runtime.

Content should live under `content/` and be organized by collection:

- `content/pages/`: public standalone pages such as Play, Store, Contact/Links, and general content.
- `content/wiki/`: wiki articles and category landing pages.
- `content/faq/`: FAQ entries or grouped FAQ pages.
- `content/news/`: dated updates, sorted newest first.

The app layer should stay thin:

- Layout and shell components provide header, footer, responsive navigation, and page structure.
- Content components provide search, wiki navigation, breadcrumbs, related links, callouts, copy-IP controls, and content cards.
- Markdown pages own the actual site copy.
- Shared configuration owns public constants such as server name, server address, Java version, Discord URL, store URL, and contact links.

Nuxt Content collections should define the metadata needed for rendering and search, such as `title`, `description`, `category`, `order`, `date`, `updated`, `tags`, and `draft` or `published` where useful. Avoid over-modeling content that is not needed for v1.

## Content Structure

The v1 public sections are:

- Home
- Play / Join guide
- Wiki
- FAQ
- Rules
- Store
- Contact / Links
- News / Updates

The initial wiki should seed the standard Minecraft server categories:

- Getting Started
- Rules
- Commands
- Claims
- Economy
- Ranks
- Events
- Troubleshooting

These pages can start with accurate placeholder copy and editing guidance, but they should not invent plugin-specific behavior. When a mechanic is unknown, the page should say what editors should replace rather than describing a fake feature.

Search should cover all public content, not only wiki pages. Search results should include labels such as Wiki, FAQ, Rules, News, Store, or Page so users can tell what type of result they are opening.

## User Experience

The visual direction is a bright community portal: polished, readable, and friendly. It should feel credible like a larger Minecraft server without losing the charm of a smaller community.

The homepage first viewport should prioritize:

- CoziCraft identity.
- Server address copy action for `play.cozicraftmc.com`.
- Java version `26.2`.
- Primary navigation to Play, Wiki, News, Store, and Discord/Contact.
- A polished placeholder scene or screenshot slot that can later be replaced with real CoziCraft screenshots.

The copy tone should be clear and human. Avoid marketing AI jargon, generic SaaS language, and inflated claims. The site should tell players how to join, where to read rules, where to find help, and where to follow updates.

Motion V can be used for gentle entrance motion, hover response, and section reveals. Motion should not delay access to content, resize stable layouts unexpectedly, or make navigation feel slow.

The site should be responsive from the start. Header navigation, search, content lists, cards, and copy actions must fit cleanly on mobile and desktop.

## Security And Public Repo Rules

V1 should be static and intentionally low-risk:

- Do not commit secrets.
- Do not expose API keys in client code.
- Do not add app auth without a new design update.
- Do not add server endpoints while the site is static-first.
- Do not add purchase logic, checkout logic, or Tebex API calls in client code.
- Do not use copied Minecraft logos, official artwork, textures, or brand assets as site branding.
- Include a visible footer disclaimer that this is not an official Minecraft service and is not approved by or associated with Mojang or Microsoft.

The repository should include:

- `README.md` for setup, purpose, and commands.
- `AGENTS.md` as the primary architecture and contributor blueprint.
- `CONTRIBUTING.md` for GitHub editing workflow and content conventions.
- `SECURITY.md` for vulnerability reporting guidance.
- `.env.example` for documented public configuration names only.
- Minimal issue and pull request templates.

No `CODE_OF_CONDUCT.md` or license file is required in v1.

## Tebex Direction

V1 should include a store page and navigation link that can point to an external Tebex store URL when available. If the Tebex URL is not ready, the store page should be honest placeholder content and should not imply purchases are live.

Future Tebex integration must be server-side only. It should not expose private Tebex credentials to the browser and should be reviewed against Minecraft monetization rules before implementation. The future path may be a server route, hosted function, or dedicated backend depending on the eventual hosting choice.

## Admin Editing Direction

V1 has no site auth and no admin editing UI. Content changes happen through GitHub.

Nuxt Studio or a similar browser-based editor can be reconsidered later, but that would require a new design update because production editing introduces OAuth/auth and server-side routing requirements that do not fit the static-only v1 architecture.

## Data Flow And Fallbacks

Markdown content renders through explicit page shells and `ContentRenderer`. Missing content should produce a Nuxt 404 using the framework's normal error handling.

Navigation should be generated from Nuxt Content helpers rather than hand-maintained arrays wherever practical. Page order can be controlled through frontmatter.

Search should be client-side, with states for idle, loading, ready, no results, and error. If the search index fails, the site should show a friendly message and preserve direct navigation to core pages.

The server IP copy action should use the Clipboard API when available. If clipboard access fails, the UI should leave the address visible and selectable.

External links such as Tebex, Discord, and contact destinations should be configurable and should fail safely when missing. Missing optional URLs should hide or soften the relevant call to action rather than generating broken links.

## Quality Bar

V1 CI should be minimal:

- Install dependencies with `npm ci`.
- Run lint.
- Run typecheck.
- Run static generation.

The local pre-push checklist should match CI:

```bash
npm run lint
npm run typecheck
npm run generate
```

If the project lacks a `lint` or `typecheck` script at implementation time, add the smallest scripts that match Nuxt's tooling. Keep Vitest and Playwright config if already scaffolded, but do not require tests in v1 CI until there is meaningful behavior to test.

## Implementation Boundaries

Keep the first implementation focused on foundation:

- Replace starter content and starter example components with CoziCraft-specific structure.
- Add content collections and seed content.
- Add the shared configuration surface.
- Add layout, navigation, content rendering, search, and copy-IP behavior.
- Add repository docs and CI.
- Verify generated static output.

Avoid unrelated refactors and avoid adding new frameworks, UI kits, CMS products, or runtime services.

## Future Extension Points

The foundation should make these future upgrades straightforward without building them now:

- Real CoziCraft screenshots and media assets.
- Live server status with a clear cache/failure plan.
- Tebex API/store package integration through a server-only path.
- Nuxt Studio or another authenticated content-editing flow.
- A separate wiki/content repository if ownership needs split later.
- Expanded CI with unit tests and Playwright smoke tests.
- License and community-governance files if the repository becomes truly open source.

## References

- [Nuxt generate command](https://nuxt.com/docs/4.x/api/commands/generate)
- [Nuxt static deployment](https://content.nuxt.com/docs/deploy/static)
- [Nuxt Content collections](https://content.nuxt.com/docs/collections/define)
- [Nuxt Content navigation](https://content.nuxt.com/docs/utils/query-collection-navigation)
- [Nuxt Content search](https://content.nuxt.com/docs/utils/use-search-collection)
- [Nuxt error handling](https://nuxt.com/docs/4.x/getting-started/error-handling)
- [Nuxt typecheck command](https://nuxt.com/docs/4.x/api/commands/typecheck)
- [Nuxt ESLint module](https://nuxt.com/modules/eslint)
- [Nuxt A11y module](https://nuxt.com/modules/a11y)
- [GitHub Actions Node.js CI](https://docs.github.com/actions/guides/building-and-testing-nodejs)
- [GitHub contributing guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)
- [GitHub security policy](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository)
- [Minecraft Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines)
- [Tebex Minecraft Java docs](https://docs.tebex.io/creators/tebex-control-panel/game-servers/minecraft-java-edition)
- [Tebex Game Server API overview](https://docs.tebex.io/developers/game-server-api/overview)
