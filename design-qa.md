# Moonlit Atlas Design QA

## Evidence

- Source visual truth: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-reference-desktop.png`
- Source mobile visual: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-reference-mobile.png`
- Desktop implementation: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-implementation-desktop-top.png`
- Desktop section captures: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-implementation-desktop-mid.png` and `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-implementation-desktop-lower.png`
- Mobile implementation: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-implementation-mobile-top.png`
- Mobile Discord capture: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-implementation-mobile-discord.png`
- Wiki implementation: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-implementation-wiki.png`
- Side-by-side comparisons: `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-comparison-top.jpg`, `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-comparison-mid.jpg`, `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-comparison-lower.jpg`, `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-comparison-mobile-top.jpg`, and `/Users/george/Projects/Personal/CoziCraftMC/.superpowers/moonlit-atlas-comparison-mobile-discord.jpg`

## Viewports and state

- Desktop source: 1440 x 3134 pixels. Desktop implementation captures: 1440 x 1100 pixels at CSS viewport 1440 x 1100 and device scale factor 1.
- Mobile source: 390 x 4982 pixels. Mobile implementation captures: 390 x 844 pixels at CSS viewport 390 x 844 and device scale factor 1.
- State: home page with no public Discord URL configured, default navigation state, and the real Java server address. The mobile menu open and closed states, the copied state, the wiki search result state, and the content routes were also checked.
- Density normalization: all comparisons use one source pixel per CSS pixel. Desktop comparison crops use the same 1440-pixel width. Mobile comparison crops use the same 390-pixel width.

## Full-view comparison evidence

The source full-page captures were compared with contiguous implementation viewport captures for the hero, adventure cards, atlas, Discord, useful links, and mobile states. The implementation keeps the source hierarchy, grid, section order, large display type, night palette, image treatment, card shapes, and responsive stacking. It changes the coded route diagram into a real Minecraft-style raster illustration and maps prototype anchors to real Nuxt routes.

## Focused comparison evidence

- Hero: the desktop and mobile side-by-side captures match image crop, image-first layout, title scale, pink emphasis, server card, and action hierarchy.
- Adventure cards: the five-column desktop grid and one-column mobile stack match the source. Each placeholder glyph is replaced by a local Lucide icon.
- Atlas: the two-column frame and content hierarchy match. A generated Minecraft map replaces the source's handcrafted SVG map.
- Discord: the large full-width panel, Discord blue icon tile, perks, and pink action match on desktop and mobile. The icon comes from Simple Icons.
- Supporting routes: the wiki, news, and content pages use the same typography, tokens, cards, and icon system while keeping their real content behavior.

## Findings

No actionable P0, P1, or P2 differences remain.

The following differences are intentional product adaptations:

- The home page uses real Markdown news content and real Nuxt routes instead of prototype hash links.
- The map is a project image asset, not a code-drawn diagram.
- The mobile primary navigation collapses into a 44-pixel menu control so it remains readable and usable.
- The last section uses current FAQ, rules, and news content. Its title is `One more lantern.` instead of repeating the prototype's utility heading.

## Required fidelity surfaces

- Fonts and typography: Georgia display text and Avenir Next or system body text preserve the source's serif and rounded-sans contrast. Weight, line height, letter spacing, wrapping, and hierarchy match at both tested widths.
- Spacing and layout rhythm: the 1400-pixel shell, large section gaps, card padding, rounded corners, borders, and hero proportions match. Desktop and mobile have no horizontal overflow.
- Colors and visual tokens: night, navy, plum, cream, amber, jade, pink, and lavender tokens match the source. Text and control contrast remains strong.
- Image quality and asset fidelity: the 1586 x 992 WebP hero is sharp at all tested sizes. The 1586 x 992 generated route map matches the same Minecraft night art direction. No visible image is replaced with CSS art or a placeholder.
- Copy and content: the selected hero copy remains intact. Supporting copy is adapted to the real CoziCraft wiki, news, rules, store, and Discord configuration state.
- Icons: visible interface icons use locally bundled Lucide and Simple Icons collections. Static generation includes 32 icons and does not fetch icons at runtime.

## Interaction and accessibility checks

- Copy address writes `play.cozicraftmc.com` and shows `Copied`. A selection fallback works when the modern clipboard API is unavailable.
- Mobile navigation opens, exposes Store and other routes, and closes.
- Wiki search returns the Claims result for `claims`.
- End-to-end tests cover the home join path, wiki search, and mobile navigation.
- Browser console errors: none.
- The development accessibility logger emitted a grouped contrast warning for dark text on amber, jade, and pink controls. Direct computed-color checks give contrast ratios of 12.73:1, 14.83:1, and 9.72:1, so no contrast failure is present.
- Focus indicators, skip link, semantic headings, alt text, live copy status, reduced-motion handling, and practical tap sizes are present.

## Comparison history

- Initial implementation check found that static generation did not bundle icon data. The icon configuration was changed to a local 32-icon client bundle. The next production generation had no icon-load warnings.
- Initial interaction check found that the in-app browser denied the modern clipboard API. A selection fallback was added. The next check copied the exact server address and showed the success state.
- Post-fix desktop and mobile comparisons found no remaining P0, P1, or P2 issue.

## Implementation checklist

- [x] Match the Moonlit Atlas visual system.
- [x] Use real raster images and real icon libraries.
- [x] Preserve real Nuxt routes and Markdown content.
- [x] Verify desktop and mobile layouts.
- [x] Verify primary interactions and browser console.
- [x] Pass lint, type checking, unit tests, static generation, and browser tests.

## Follow-up polish

- Add the public Discord invite through `NUXT_PUBLIC_DISCORD_URL` when it is ready.

final result: passed
