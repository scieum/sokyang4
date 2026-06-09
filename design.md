---
id: meta
name: Meta
country: US
category: consumer-tech
homepage: "https://about.meta.com"
primary_color: "#0064E0"
logo:
  type: simpleicons
  slug: "meta"
verified: "2026-06-06"
added: "2026-06-06"
omd: "0.1"
---

# Design System Inspiration of Meta

## 1. Visual Theme & Atmosphere

Meta is the rebrand of Facebook, Inc. into a company organized around connection across the social graph, devices, and the immersive web. Where the old Facebook interface was a wall of utilitarian `#1877F2` blue, the Meta brand is built around motion, depth, and an optimistic gradient that flows from a deep, trustworthy blue (`#0064E0`) into a brighter, almost luminescent cerulean (`#0082FB`). The infinity mark — a continuous 3D loop that reads equally well in 2D and in spatial/AR contexts — is the visual anchor: it signals "unlimited" without shouting.

The atmosphere is **big-tech confident but human**. Pages open on generous white (`#FFFFFF`) or a near-black ink (`#1C2B33`) depending on surface, with the blue gradient reserved for moments of brand energy: hero washes, CTA fills, focus rings, and the logo itself. This is not the flat, single-blue Facebook of 2012; it's a layered system where the gradient implies a third dimension, echoing the company's bet on immersive computing.

The custom **Optimistic** type superfamily (Optimistic Display for headlines, Optimistic Text for body) is the quiet workhorse. Purpose-built for Meta's surfaces, it carries warm, slightly humanist letterforms that keep a trillion-impression interface from feeling robotic.

**Key Characteristics:**
- Meta Blue gradient (`#0064E0` → `#0082FB`) as the signature brand energy — depth, trust, optimism
- Optimistic Display / Optimistic Text custom superfamily, warm humanist sans
- Near-black ink `#1C2B33` (not pure black) for text and dark surfaces
- Generous whitespace, large friendly display type, single-column hero rhythm
- Gradient and motion imply a third dimension — a nod to immersive computing
- Pill and large-radius buttons (28px+), soft elevation, minimal hard borders
- Accessibility-first contrast; blue reserved for interaction and brand moments

## 2. Color Palette & Roles

### Primary
- **Meta Blue** (`#0064E0`): Primary brand blue — CTA fills, links, focus, active states. The workhorse interactive color.
- **Meta Light Blue** (`#0082FB`): Bright terminus of the brand gradient. Top/right stop in gradient fills, hover lift.
- **Meta Blue Bright** (`#0080FB`): Lighter UI accents and link hover on dark surfaces.
- **Pure White** (`#FFFFFF`): Page background, card surfaces, button text on blue.
- **Meta Ink** (`#1C2B33`): Primary heading and body ink — a blue-gray near-black, not `#000000`.

### Brand Gradient
- **Brand Gradient**: `linear-gradient(120deg, #0064E0 0%, #0082FB 100%)`. Hero washes, primary CTA fills, brand splash. Always blue-to-blue.

### Semantic
- **Success Green** (`#42B72A`): Positive confirmations, online presence, completed states.
- **Error Red** (`#FA383E`): Errors, destructive actions, validation failures.
- **Warning Amber** (`#F5A623`): Caution, pending, attention-needed.
- **Info Blue** (`#0064E0`): Informational accents reuse the primary blue.

### Neutral Scale
- **Ink 900** (`#1C2B33`): Primary text, dark surfaces.
- **Gray 700** (`#465A69`): Emphasized body, sub-headings.
- **Gray 600** (`#65676B`): Body text, descriptions.
- **Gray 500** (`#8A8D91`): Caption text, secondary labels, metadata.
- **Gray 400** (`#BCC0C4`): Placeholder text, disabled icon fills.
- **Gray 200** (`#E4E6EB`): Default border, divider, input fill on light.
- **Gray 100** (`#F0F2F5`): Secondary background, card fills, the classic Facebook canvas gray.

### Surface & Borders
- **Border Default**: `#E4E6EB`. **Border Strong**: `#CED0D4`.
- **Surface Raised**: `#FFFFFF` on a `#F0F2F5` canvas — the core Facebook layering pattern.
- **Overlay Scrim**: `rgba(28,43,51,0.6)`. Modal backdrops.

## 3. Typography Rules

### Font Family
- **Display**: `"Optimistic Display", "Helvetica Neue", Helvetica, Arial, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Text**: `"Optimistic Text", "Helvetica Neue", Helvetica, Arial, -apple-system, "Segoe UI", Roboto, sans-serif`
- Use Display ≥ 24px, Text < 24px.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | Optimistic Display | 56px | 700 | 1.07 | -0.02em |
| Display Large | Optimistic Display | 40px | 700 | 1.20 | -0.01em |
| Display | Optimistic Display | 32px | 600 | 1.25 | -0.01em |
| Heading | Optimistic Display | 24px | 600 | 1.33 | normal |
| Subtitle | Optimistic Text | 20px | 600 | 1.40 | normal |
| Body Large | Optimistic Text | 17px | 400 | 1.53 | normal |
| Body | Optimistic Text | 15px | 400 | 1.47 | normal |
| Body Small | Optimistic Text | 13px | 400 | 1.38 | normal |
| Caption | Optimistic Text | 12px | 400 | 1.33 | normal |
| Button Label | Optimistic Text | 15px | 600 | 1.33 | normal |

### Principles
- **Display vs Text split**: Optimistic Display for ≥24px headlines, Optimistic Text for body.
- **Three core weights**: 400 (body), 600 (emphasis/buttons), 700 (display headlines).
- **Negative tracking at scale**: Large display tightens to `-0.01em`/`-0.02em`; body stays normal.
- **Roomy line-height for reading**: Body at ~1.47.

## 4. Component Stylings

### Buttons
**Primary (Gradient)** — bg `linear-gradient(120deg,#0064E0,#0082FB)`, white text, radius 28px (marketing) / 8px (product), padding 14px 28px, 15/600. Hover brightens; pressed `#0058C4`; disabled opacity 0.4.
**Primary (Solid)** — bg `#0064E0`, white, radius 8px, padding 12px 20px. Hover `#0058C4`.
**Secondary** — bg `#E4E6EB`, text `#1C2B33`, radius 8px. Hover `#D8DADF`.
**Outline** — transparent, text `#0064E0`, 1.5px `#0064E0` border. Hover `rgba(0,100,224,0.06)`.
**Ghost / Text** — transparent, text `#0064E0`, radius 6px.

### Inputs
**Default** — white bg, `#1C2B33` text, 1px `#CED0D4` border, radius 8px, padding 12px 14px, placeholder `#8A8D91`, focus border `#0064E0` + `0 0 0 3px rgba(0,100,224,0.18)` ring.
**Filled** — `#F0F2F5` bg; focus white bg + `#0064E0` border.
**Error** — 1px `#FA383E` border + `0 0 0 3px rgba(250,56,62,0.18)` ring.

### Cards
**Standard** — white, radius 12px, padding 16px, shadow `0 1px 2px rgba(28,43,51,0.10)`.
**Featured** — white, radius 16px, padding 24px, shadow `0 4px 16px rgba(28,43,51,0.12)`.
**Gradient Hero** — `linear-gradient(120deg,#0064E0,#0082FB)`, white text, radius 20px, padding 32px, shadow `0 8px 32px rgba(0,100,224,0.30)`.
**Compact (Bordered)** — white, 1px `#E4E6EB` border, radius 8px, no shadow.

### Badges
**Notification** — `#FA383E` bg, white 12/700, radius 9999px, 2px white border.
**Status / Pill** — `rgba(0,100,224,0.12)` bg, `#0064E0` text, radius 9999px.
**Success Pill** — `rgba(66,183,42,0.14)` bg, `#2E8B1E` text, radius 9999px.

### Tabs
**Top Tab (Active)** — `#0064E0` text + 3px bottom border `#0064E0`; inactive `#65676B`.
**Segmented** — `#F0F2F5` track, active white + `#1C2B33` + subtle shadow, radius 8px.

### Toasts / Dialogs / Toggles
- **Toast** — `#1C2B33` bg, white text, radius 8px, 3s auto-dismiss.
- **Centered Modal** — white, radius 12px, padding 24px, shadow `0 12px 28px rgba(28,43,51,0.20)`, backdrop `rgba(28,43,51,0.6)`.
- **Toggle** — `#0064E0` on / `#BCC0C4` off, white thumb, radius 9999px.

---

**Verified:** 2026-06-06 · Tier 1: about.meta.com / meta.com (blue gradient, Optimistic type, infinity mark); design.facebook.com rebrand story. Tier 2: brandpalettes.com, brandcolorcode.com (corroborate `#0082FB`, `#0064E0`, `#1C2B33`). **Surface split:** marketing brand (gradient CTAs, pill radii, Optimistic Display) + Facebook/Instagram product lineage (solid `#0064E0`, 8px radii, `#F0F2F5` canvas).

## 5. Layout Principles

### Spacing System
- Base unit: 4px. Common values: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96px.
- Page gutter: 16px mobile, 24px tablet, centered max-width desktop. Card padding: 16px (standard), 24px (featured).

### Grid & Container
- Marketing: 12-column grid, max ~1200px, centered.
- Product: three-column shell — left rail, center feed (~600px), right rail.
- Mobile-first collapse to single column under 768px.

### Whitespace Philosophy
- Room to breathe at brand moments (96px+ vertical rhythm at hero).
- Dense but layered in product: white cards lifted off `#F0F2F5`.
- Grouped by relationship: 8–12px within, 32–48px between sections.

### Border Radius Scale
- Compact 6px · Standard 8px (inputs, product buttons) · Comfortable 12px (cards, dialogs) · Large 16–20px (featured, hero) · Pill 28px / 9999px (marketing CTAs, badges, toggles).

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Page canvas |
| Subtle (1) | `0 1px 2px rgba(28,43,51,0.10)` | Feed cards |
| Standard (2) | `0 4px 16px rgba(28,43,51,0.12)` | Featured cards |
| Elevated (3) | `0 8px 24px rgba(28,43,51,0.16)` | Dropdowns, popovers |
| Modal (4) | `0 12px 28px rgba(28,43,51,0.20)` | Dialogs |
| Brand Glow | `0 8px 32px rgba(0,100,224,0.30)` | Gradient hero only — licensed colored shadow |

**Shadow Philosophy**: Ink-tinted (`#1C2B33`) neutral shadows for product layering (white cards off `#F0F2F5`). The only colored shadow is the brand gradient hero glow.

## 7. Do's and Don'ts

### Do
- Use the Meta Blue gradient for brand hero moments and primary marketing CTAs.
- Use solid `#0064E0` for product-surface interactive elements.
- Use Optimistic Display ≥24px, Optimistic Text for body.
- Lift white cards off the `#F0F2F5` canvas with subtle ink-tinted shadows.
- Use `#1C2B33` for text, never pure `#000000`.
- Reserve the gradient — once per view at most.

### Don't
- Don't blend the gradient with off-brand hues — always blue-to-blue.
- Don't use legacy flat `#1877F2` as the Meta brand color.
- Don't apply colored shadows anywhere except the gradient hero.
- Don't use pure black text/backgrounds.
- Don't overuse the gradient.
- Don't set body weight above 400 except emphasis (600) and headlines (700).

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single column, 16px gutter, bottom nav, stacked hero |
| Tablet | 768–1024px | Two columns, 24px gutter |
| Desktop | 1024–1440px | Three-column shell / 12-col grid |
| Wide | >1440px | Centered max-width ~1200px |

### Touch Targets
- Buttons: min 44px height (48px primary). Icon buttons: 40px. List rows: 48px+.

### Collapsing Strategy
- Three-column shell collapses right→left; marketing hero stacks media below headline; top nav → bottom tab bar on mobile.

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: `#0064E0` · Brand Gradient: `linear-gradient(120deg,#0064E0,#0082FB)` · CTA Hover: `#0058C4`
- Background (product): `#F0F2F5` · Background (marketing): `#FFFFFF`
- Heading: `#1C2B33` · Body: `#65676B` · Caption/Placeholder: `#8A8D91` · Border: `#E4E6EB`
- Success: `#42B72A` · Error: `#FA383E` · Warning: `#F5A623`

### Example Component Prompts
- "Gradient hero CTA: `linear-gradient(120deg,#0064E0,#0082FB)`, white 15/600, 28px radius, 14px 28px padding, glow `0 8px 32px rgba(0,100,224,0.30)`."
- "Feed card: white, 12px radius, 16px padding, shadow `0 1px 2px rgba(28,43,51,0.10)` on `#F0F2F5`."
- "Primary product button: `#0064E0`, white 15/600, 8px radius, 12px 20px. Hover `#0058C4`."

### Iteration Guide
1. Optimistic Display for headlines, Optimistic Text for body, Helvetica/system fallbacks.
2. Primary interactive `#0064E0`; gradient for hero/brand moments only.
3. Text ink `#1C2B33`, body gray `#65676B`, never pure black.
4. Lift white cards off `#F0F2F5` with subtle ink shadows.
5. Radii: 8px product, 28px+ pill marketing, 12px cards, 16–20px featured.
6. Colored shadow only on the gradient hero.

## 10. Voice & Tone

Meta speaks with the optimism of a company betting on connection — confident, forward-looking, plainspoken, warm. Inclusive second-person ("Build the future with us"). Aspirational at the brand layer, utilitarian-friendly at the product layer.

| Context | Tone |
|---|---|
| CTAs | Imperative, short, optimistic (`Get started`, `Learn more`) |
| Success toasts | Plain past-tense single line (`Saved`). No exclamation spam. |
| Error messages | Specific, blameless, actionable. |
| Empty states | Explain why empty + one action. Friendly, never cold. |

**Forbidden patterns.** Over-hyped superlatives ("revolutionary", "game-changing"), fear-based urgency, pure-black `#000000` text, legacy flat `#1877F2`, gradient blends with non-blue hues.

## 11. Brand Narrative

In **October 2021**, Facebook, Inc. rebranded its parent company to **Meta**, signaling a pivot from a single social network to a company organized around connection across social, devices, and the immersive web. The name derives from the Greek "beyond"; the **infinity mark** — a continuous 3D loop — was designed to live natively in both 2D and 3D/AR space, embodying "unlimited potential."

The brand moved past Facebook's flat `#1877F2` blue. Meta's blue **gradient** (`#0064E0` deep, `#0082FB` bright) carries the heritage blue while adding depth and motion — a third dimension mirroring the immersive-computing thesis. A near-black `#1C2B33` grounds the energetic blue. The custom **Optimistic** typeface keeps a planet-scale interface human and warm.

Meta operates Facebook, Instagram, WhatsApp, Messenger, Threads — alongside Reality Labs hardware (Quest, Ray-Ban Meta glasses) and large-scale AI. The system flexes from dense product surfaces (the Facebook feed on `#F0F2F5`, packed with white cards) to expansive gradient-washed brand marketing. The connective tissue: the blue gradient, the infinity mark, Optimistic type, and the discipline of reserving brand energy for moments that earn it.

## 12. Principles

1. **The gradient is brand energy — spend it carefully.** Hero and primary-CTA moments, not wallpaper.
2. **Depth implies the third dimension.** Elevation is intentional, not decorative.
3. **Lift white off gray.** White cards on a `#F0F2F5` canvas; hierarchy from layering, not borders.
4. **Ink, not black.** `#1C2B33` everywhere a designer would reach for `#000000`.
5. **Display for headlines, Text for reading.**
6. **Human optimism over hype.**
7. **One blue, two roles.** Solid `#0064E0` is interaction; the gradient is brand.
8. **Scale demands restraint.**

## 13. Personas

*Fictional archetypes informed by publicly described Meta user segments.*

**Maya, 24, Austin TX.** Creator and student. Lives in Instagram and Threads. Expects the interface to disappear behind her content. Mobile-first.

**David, 41, Chicago.** Marketing manager running Meta Business ad campaigns. Power user of dense product surfaces. Values clarity and information density.

**Priya, 33, London.** Reality Labs early adopter (Quest, Ray-Ban Meta). Sensitive to the gradient and infinity mark as signals of the immersive-future story.

## 14. States

| State | Treatment |
|---|---|
| Empty (first use) | Friendly `#65676B` explainer + one `#0064E0` action. |
| Empty (no results) | Single `#8A8D91` caption (`No results found`). |
| Loading (first paint) | `#E4E6EB` skeleton, 1.2s shimmer, component radius. |
| Error (inline field) | `#FA383E` border + `0 0 0 3px rgba(250,56,62,0.18)` ring, red helper 13px. |
| Error (toast) | `#1C2B33` bg, white text, 3s dismiss. |
| Success (toast) | `#1C2B33` bg, white text, optional `#42B72A` check. |
| Disabled | Opacity 0.4; inputs keep `#CED0D4` border. |
| Focus | `#0064E0` border + `0 0 0 3px rgba(0,100,224,0.18)` ring. Always visible. |
| Hover (button) | Solid darkens to `#0058C4`; gradient brightens. 150ms. |

## 15. Motion & Easing

| Token | Value | Use |
|---|---|---|
| motion-instant | 0ms | Reduced-motion flips |
| motion-fast | 150ms | Hover, focus, press |
| motion-standard | 250ms | Menus, tab switch |
| motion-slow | 400ms | Modal entrance |
| motion-brand | 600ms | Gradient hero reveal, infinity-mark loop |

Easings: `ease-enter` cubic-bezier(0,0,0.2,1) · `ease-exit` cubic-bezier(0.4,0,1,1) · `ease-standard` cubic-bezier(0.4,0,0.2,1) · `ease-brand` cubic-bezier(0.22,1,0.36,1).

**Signature motions.** Gradient reveal (living shimmer), infinity-mark loop (seamless), card lift (Level 1→2 on hover + 1–2px translateY). Under `prefers-reduced-motion: reduce`, all collapse to instant / static.

---

## Included Components

- Button
- Input
- Table
- Card
- Badge
- Tabs
- Dialog

---

## Iconography & SVG Guidelines

### Icon Library
Use a single, consistent icon library. Recommended: **Lucide React** (`lucide-react`, default for shadcn/ui), Radix Icons, or Heroicons. Pick ONE and use it everywhere.

### SVG Usage Rules
- All icons inline SVG components (not `<img>`), color via `currentColor`.
- Sizes: 16px inline, 18–20px buttons, 24px standalone. Stroke 1.5–2px for outline icons.

### Icon Sizing Scale
| Context | Size |
|---------|------|
| Inline text | 16px |
| Button icon | 18px |
| Standalone | 24px |
| Feature | 32–48px |

### SVG Optimization
- Run custom SVGs through SVGO; remove `xmlns`/editor metadata; use `viewBox` not fixed width/height.

---

## Document Policies

### No Emojis
This design system must not use emojis in any UI element, component, label, status indicator, or documentation. Use SVG icons instead.
- Status indicators: colored dots or icon components, not emoji.
- Section markers: text prefixes ("DO:" / "DON'T:") or icons.

### Format Compliance
Follows the Google Stitch DESIGN.md 9-section format (Visual Theme, Color, Typography, Components, Layout, Depth, Do's/Don'ts, Responsive, Agent Prompt Guide), extended with Iconography & SVG Guidelines and Document Policies.
