# SONAR product homepage

The new homepage lives in `src/components/sonar`; styles are separated by section in `src/components/sonar/styles`. The existing secondary pages keep their original shell. The Electron application is unchanged.

## Run

```powershell
cd site
npm.cmd ci
npm.cmd run dev
```

For a production build, run `npm.cmd run build`, then `npm.cmd run start`.

## Beta destination

Set `SONAR_BETA_URL` in `.env.local` to the real HTTPS invitation form or an approved `mailto:` destination, then rebuild. Without this setting, the Beta section explicitly displays that invitations are coming soon. No registration is simulated and no email is collected.

## Product assets and data

- The official logo is copied from `frontend/public/brand/logo.png`.
- The workspace reuses `PlayerBarMock` and the existing `mockData` library and playlist tree.
- Maps, matches, samples and the Live DJ HUD are labelled previews, not screenshots or live analysis. Replace these with approved application captures when available.
- The interactive matches demo sorts by BPM distance only; it does not call SONAR's analysis backend.
- The demo set is local React state and resets on reload.

## Motion and performance

Canvas 2D renders 3,600 demo items on desktop and 1,100 on narrow screens, with pixel ratio capped at 1.5. Maps pause outside the viewport and while the document is hidden. Reduced-motion preferences disable the continuous loop and scroll transforms. Framer Motion handles the hero scroll and workspace perspective; the homepage does not import Three.js.

## Verification

Production build, TypeScript and targeted ESLint checks passed. The final build reports 163 kB first-load JavaScript for `/`. Hydration precision issues were corrected by rounding waveform heights; the expected theme initialization root-style difference is isolated with `suppressHydrationWarning` on the HTML element.

On 2026-09-18, the production build was reviewed through the Browser skill in Chrome at requested viewport widths of 390, 768 and 1440 pixels (usable document widths 380, 758 and 1430 with the scrollbar). No horizontal document overflow or console errors/warnings were observed during this run.

Verified interactions:
- Mobile navigation opens and closes with Escape.
- Demo set add/remove updates its count and empty state.
- Choosing Parallax changes the reference and produces Nightdrive as a next possibility.
- Workspace Library/Visual Map controls switch their content and pressed state.
- Loops selects Broken groove 08; keyboard Enter on Stems selects Atmosphere stem 04.
- Beta navigation reaches the explicit invitation-pending state.
- BRIDGE relationship selection was checked in the earlier desktop review.

Visual inspections covered the mobile hero and workspace, tablet workspace, and wide desktop Producer section. Canvas projection objects are reused across frames; canvas sizing excludes parent transforms and cursor coordinates account for their rendered dimensions. Mobile hero scroll fading is disabled.

Remaining launch checks: reduced-motion behavior in an emulated or configured browser, sustained frame-rate measurements on target devices, approved real application captures, and the real Beta destination. Sustained 60 FPS is not claimed.

This directory is inside the repository's ignored `.scratch` tree. Changes are present locally, but are not automatically tracked in the parent repository. No production deployment or transfer to the parent `site` directory has been performed.

## DJ lineup and map update (2026-09-18)

The homepage now uses `djPlans.ts`: Free 0 EUR, Core 9.99/month or 89/year, Pro 14.99/month or 139/year, Live 19.99/month or 189/year. Annual amounts are total annual charges. These are proposed launch tiers; feature readiness and unspecified quotas remain explicit. No checkout is wired. `/pricing` redirects to the current homepage comparison. Producer is still showcased, but is not included in the DJ billing grid.

Point colors are dark, saturated derivatives of the desktop CLUSTER_COLORS. Flux gradients interpolate source/target cluster colors in both map renderers. Track actions are ordered FOCUS / MATCHES / SET. Existing two-second idle rotation and reduced-motion behavior are preserved. Competitor claims from the supplied strategy memo were not published as verified comparisons.
