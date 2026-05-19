# Plan of Action — Portfolio Website Theme Professionalization

## 1. Current Website Overview
This codebase is a single-page portfolio website built with the Next.js App Router. The homepage is composed of anchored sections rendered in sequence: background treatment, sticky navigation, hero, about, experience, skills, projects, and a contact/footer area. The site already presents a distinct dark technical visual direction with glassmorphism, motion effects, and section-specific card layouts.

The current implementation is content-rich and structurally complete for a portfolio, but the overall visual system is not yet cohesive enough to feel fully professional and polished. Typography usage is mixed, spacing rhythm varies by section, background treatments are more experimental than refined, and several components repeat similar glass/card styling without a shared reusable token system. The goal should be to preserve the existing page flow, component inventory, copy meaning, and interactions while tightening the design language across the entire experience.

## 2. Existing Tech Stack
- Framework: Next.js `16.2.6` with React `19.2.4`
- Routing approach: App Router via `src/app/layout.tsx` and `src/app/page.tsx`
- Styling approach: Global CSS plus component-scoped CSS Modules
- Component structure: Section-based React components in `src/components`
- Asset handling: Static assets from `public/`; hero logo uses plain `<img>` and project data references several preview images
- Animation library: `framer-motion`
- Icon library: `lucide-react`
- Utility libraries present: `clsx`, `tailwind-merge`

Additional implementation notes:
- `next/font/google` loads `Inter` in `src/app/layout.tsx`
- `src/app/globals.css` also imports `Inter`, `Outfit`, and `JetBrains Mono` through Google Fonts `@import`
- Tailwind-style class strings appear in a few JSX locations even though the project does not appear to include a Tailwind setup

## 3. Current Component Inventory

### App Layout Shell
- File path: `src/app/layout.tsx`
- Purpose: Defines metadata, root HTML shell, and body font class
- Current styling approach: `next/font/google` with global stylesheet import
- Dependencies: `next`, `next/font/google`, `src/app/globals.css`
- Should keep: Yes
- Planned visual improvement: Consolidate font strategy so the root layout becomes the single source of truth for typography loading

### Home Page Composition
- File path: `src/app/page.tsx`
- Purpose: Composes the one-page portfolio section order
- Current styling approach: Structural composition only; uses global `.container`
- Dependencies: `Nav`, `Hero`, `About`, `Experience`, `Section`, `Skills`, `Projects`, `Footer`, `Background`
- Should keep: Yes
- Planned visual improvement: Preserve section ordering while aligning vertical rhythm, section spacing, and wrapper consistency

### Global Theme and Utilities
- File path: `src/app/globals.css`
- Purpose: Defines root tokens, resets, fonts, utilities, scrollbar, container, and shared classes
- Current styling approach: CSS custom properties and handcrafted utility classes
- Dependencies: Entire app
- Should keep: Yes
- Planned visual improvement: Expand into a more robust design token layer for typography, color, spacing, radius, shadow, transitions, and breakpoints

### Legacy Template Styles
- File path: `src/app/page.module.css`
- Purpose: Appears to be leftover template styling from earlier scaffolded content
- Current styling approach: CSS Module not used by the current homepage composition
- Dependencies: None in active render path
- Should keep: Yes
- Planned visual improvement: Leave untouched during theme work unless later cleanup is explicitly approved

### Section Wrapper
- File path: `src/components/Section.tsx`
- Purpose: Reusable wrapper for anchored sections and optional section title
- Current styling approach: Inline utility-style class string plus global `.section-title`
- Dependencies: Used by skills and projects sections
- Should keep: Yes
- Planned visual improvement: Standardize section spacing and optionally move wrapper spacing into a shared class or tokenized pattern

### Background
- File path: `src/components/Background.tsx`, `src/components/Background.module.css`
- Purpose: Provides the fixed technical background with glow, grid, lines, decorative box, and floating particles
- Current styling approach: CSS Module plus `framer-motion`
- Dependencies: `framer-motion`, React state/effect
- Should keep: Yes
- Planned visual improvement: Refine the background so it feels quieter, more premium, and less visually noisy while preserving the technical mood

### Header / Navbar
- File path: `src/components/Nav.tsx`, `src/components/Nav.module.css`
- Purpose: Sticky navigation with anchor links plus resume and meeting actions
- Current styling approach: CSS Module with rounded glass pill container
- Dependencies: `next/link`, `next/navigation`, `lucide-react`
- Should keep: Yes
- Planned visual improvement: Improve hierarchy, active-state clarity, spacing balance, and mobile adaptation while preserving existing links and calls to action

### Hero Section
- File path: `src/components/Hero.tsx`, `src/components/Hero.module.css`
- Purpose: Introduces the portfolio owner, presents a conversational prompt area, and shows suggestion pills
- Current styling approach: Centered layout, oversized title, glass input panel, pill buttons, `framer-motion`
- Dependencies: `framer-motion`, `lucide-react`, `/public/image.png`
- Should keep: Yes
- Planned visual improvement: Strengthen typography hierarchy, reduce visual clutter, improve CTA/input polish, and create a more credible premium first impression without changing the content structure

### About Section
- File path: `src/components/About.tsx`, `src/components/About.module.css`
- Purpose: Displays location, date, biography, and languages
- Current styling approach: Centered layout with mono-heavy body copy and rounded language cards
- Dependencies: `framer-motion`
- Should keep: Yes
- Planned visual improvement: Improve readability, reduce overuse of mono typography, tighten content width, and make metadata and language cards feel more editorial and polished

### Experience / Timeline Section
- File path: `src/components/Experience.tsx`, `src/components/Experience.module.css`
- Purpose: Shows education and work history in a vertical timeline
- Current styling approach: Grid-based timeline with animated center line and glass cards
- Dependencies: `framer-motion`, `lucide-react`
- Should keep: Yes
- Planned visual improvement: Improve timeline legibility, card spacing, date prominence, responsive simplification, and consistency with the broader theme system

### Skills Section
- File path: `src/components/Skills.tsx`, `src/components/Skills.module.css`
- Purpose: Displays technology/skill cards in a responsive grid
- Current styling approach: CSS grid with icon cards and hover elevation
- Dependencies: `framer-motion`, `lucide-react`
- Should keep: Yes
- Planned visual improvement: Improve visual consistency, icon scale balance, card alignment, label readability, and grid rhythm while preserving all skills

### Projects / Portfolio Section
- File path: `src/components/Projects.tsx`, `src/components/Projects.module.css`
- Purpose: Displays horizontally scrollable project cards with tags, badges, and optional outbound links
- Current styling approach: Carousel-style horizontal scroll, large dark cards, hover overlays, motion interactions
- Dependencies: `framer-motion`, `lucide-react`
- Should keep: Yes
- Planned visual improvement: Improve project card hierarchy, preview area treatment, badge consistency, tag styling, navigation affordance, and polish of hover states while keeping all project entries

### Achievements / Testimonials-Adjacent Optional Section
- File path: `src/components/Achievements.tsx`, `src/components/Achievements.module.css`
- Purpose: Unused but present milestone/recognition section
- Current styling approach: Card grid with subtle glow and motion
- Dependencies: `framer-motion`, `lucide-react`
- Should keep: Yes
- Planned visual improvement: Do not remove; keep compatible with future theme tokens so it can be re-enabled later without extra redesign effort

### Contact Section + Footer
- File path: `src/components/Footer.tsx`, `src/components/Footer.module.css`
- Purpose: Handles contact CTAs, social links, and footer metadata
- Current styling approach: Contact cards plus icon row and footer meta block
- Dependencies: `framer-motion`, `lucide-react`, inline SVG icons
- Should keep: Yes
- Planned visual improvement: Improve CTA clarity, icon button consistency, footer information hierarchy, and spacing so the ending feels intentional and professional

### Static Assets
- File path: `public/`
- Purpose: Logo, document download, template SVGs, and any project images
- Current styling approach: Static file serving
- Dependencies: Hero logo and resume download
- Should keep: Yes
- Planned visual improvement: Preserve current assets, audit missing project preview images, and ensure image usage matches the refined visual system

## 4. Design Direction

### Overall visual style
A restrained, premium, modern portfolio aesthetic with a dark editorial-tech base. The site should feel credible and senior-level rather than flashy or experimental. Keep the current technical character, but reduce noise and increase composure.

### Typography direction
Use a strong but clean sans-serif for headings and a highly readable sans-serif for body copy. Reserve mono typography for supporting metadata, tags, or technical labels only.

### Color palette direction
Retain a dark foundation, but shift from pure black and scattered white transparencies toward a more controlled slate/navy palette with deliberate surface elevation and one primary accent.

### Spacing system
Introduce a consistent spacing scale with clear section rhythm, card padding consistency, and better whitespace between labels, headings, copy, and actions.

### Border radius style
Use a consistent modern radius language: soft rounded corners for cards and surfaces, fully pill-shaped treatment only where it supports existing interaction patterns such as navigation chips and badges.

### Shadow/elevation style
Prefer subtle layered shadows and surface contrast over aggressive glow effects. Use softer depth cues with occasional accent glow only where it adds hierarchy.

### Button style
Buttons should be crisp, confident, and consistent across nav actions, hero actions, project actions, and contact CTAs. Favor cleaner hover states and clear primary/secondary distinction.

### Card style
Cards should feel part of one system instead of separate one-off treatments. Unify border opacity, background tint, padding, radius, hover lift, and internal spacing.

### Section layout style
Each section should maintain its current role but share common alignment rules, max widths, headings, label treatments, and top/bottom spacing.

### Mobile responsiveness direction
Preserve the single-page narrative while reducing horizontal strain, improving tap targets, tightening card sizing, and simplifying decorative density on smaller screens.

## 5. Recommended Font System
Candidate options:
- Inter
- Manrope
- Plus Jakarta Sans
- Geist
- Sora

Recommended final combination:
- Heading font: `Manrope`
- Body font: `Inter`
- Fallback fonts: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Why this combination:
- `Manrope` gives headings a professional, contemporary personality without looking overly playful
- `Inter` remains highly legible for longer body copy and UI text
- Existing technical metadata can continue using the current mono layer, ideally `JetBrains Mono`, but in a more limited role

Alternative safe combinations:
- `Geist` for both headings and body if a more minimal system is preferred
- `Plus Jakarta Sans` headings with `Inter` body for a slightly softer feel

## 6. Recommended Color Palette
- Primary color: `#3B82F6`
- Secondary color: `#0F172A`
- Accent color: `#22C55E`
- Background color: `#08111F`
- Surface/card color: `#0F1B2D`
- Text primary: `#F8FAFC`
- Text secondary: `#94A3B8`
- Border color: `#1E293B`
- Success color: `#22C55E`
- Error color: `#EF4444`
- Warning color: `#F59E0B`

Implementation notes:
- These values support a professional dark theme without relying on harsh black/white contrast everywhere
- Blue can remain the core accent for trust and technical credibility
- Green should be used sparingly for status or startup highlight moments, not as a competing theme color

## 7. Theme Tokens to Create or Update
- `fontFamily`
- `fontSize`
- `lineHeight`
- `fontWeight`
- `letterSpacing`
- `colors`
- `spacing`
- `radius`
- `borders`
- `shadows`
- `transitions`
- `containerWidths`
- `breakpoints`
- `zIndex`

Suggested direction:
- `fontFamily`: display, body, mono
- `fontSize`: clear scale from small metadata through display heading
- `lineHeight`: separate values for display, heading, body, and compact labels
- `colors`: background, surface, elevated surface, border, text primary, text secondary, accent, muted states
- `spacing`: consistent 4px or 8px-based scale
- `radius`: small, medium, large, pill
- `shadows`: low, medium, elevated, glow-accent
- `transitions`: fast, standard, emphasized
- `breakpoints`: mobile, tablet, desktop, wide desktop

## 8. Component-wise Update Plan

### Header/Navbar
- Improve spacing balance between navigation links and action buttons
- Add a stronger active or current-section state
- Improve glass treatment so it feels less translucent and more intentional
- Ensure sticky behavior remains elegant on smaller screens
- Keep existing links and existing resume / meet actions

### Hero Section
- Improve typography hierarchy between greeting, name, and supporting copy
- Refine logo/name lockup alignment so it feels less improvised
- Improve chat input polish and perceived purpose without changing the structure
- Improve suggestion pill styling and wrapping behavior
- Tone down visual noise so the hero reads as premium and confident
- Keep existing content and interaction pattern

### About Section
- Improve bio readability by reducing mono-heavy body copy usage
- Improve metadata spacing and styling
- Refine language card presentation for better hierarchy
- Keep current biography content and language list

### Experience / Timeline Section
- Improve date legibility and relationship to card content
- Make category labels, descriptions, and cards feel more connected
- Refine timeline line contrast and mobile fallback
- Reduce styling divergence from the rest of the site
- Keep all entries and current ordering

### Skills Section
- Improve grid density and visual balance
- Improve icon and label scale consistency
- Refine hover styling so it feels cleaner and less generic
- Keep all current skill items

### Projects Section
- Improve project heading hierarchy
- Improve scroll affordance and horizontal rhythm
- Improve project card styling and internal spacing
- Add more credible preview treatment if project images are present later
- Improve hover effect subtlety
- Keep all current project data and structure

### Contact Section
- Improve CTA card clarity and consistency
- Improve social icon button hierarchy
- Refine spacing between description, cards, icons, and footer meta
- Keep existing links and actions

### Footer
- Improve final information hierarchy and alignment
- Keep current owner name and last-updated information unless content updates are explicitly requested

### Background
- Reduce decorative intensity
- Maintain technical atmosphere with more restrained gradients, grids, and particles
- Ensure background does not compete with text readability

### Reusable UI Patterns
- Unify labels, pills, tags, buttons, cards, borders, and hover states
- Move repeated surface values into shared tokens instead of repeating per component

## 9. Responsive Design Plan
- Reassess top-level container width and side padding across breakpoints
- Improve navbar behavior and spacing for smaller screens
- Reduce hero title scale jumps and improve wrapping
- Ensure suggestion pills and skill cards wrap gracefully
- Simplify timeline layout earlier on tablet widths if needed
- Rework project card widths and spacing for mobile usability
- Verify contact cards stack cleanly with comfortable tap targets
- Reduce decorative background density on mobile to improve clarity and performance

## 10. Accessibility Plan
- Improve color contrast for muted text, secondary labels, borders, and interactive hover states
- Add or verify visible focus states for all interactive elements
- Check semantic heading hierarchy section by section
- Verify button and link affordance, especially icon-only actions
- Confirm keyboard navigation through nav, project actions, and contact links
- Audit `alt` text and image usage, including the hero logo and future project previews
- Review scrollable project section for keyboard and touch accessibility
- Reduce purely decorative motion where it may distract users

## 11. Implementation Phases

### Phase 0 — Codebase Analysis
Inspect structure, sections, styling, assets, motion usage, and current risks before visual changes.

### Phase 1 — Theme Tokens / Global Styles
Create or refine the token foundation in `globals.css` and related shared styling so the rest of the redesign uses one design system.

### Phase 2 — Typography and Layout Cleanup
Normalize font loading, heading hierarchy, body styles, section widths, and vertical spacing without changing section order or content meaning.

### Phase 3 — Header, Footer, Navigation
Refine the sticky nav, primary actions, footer contact cards, social icons, and closing metadata treatment.

### Phase 4 — Hero and Main Sections
Polish the hero, about, experience, and skills sections with stronger hierarchy and more consistent surface styling.

### Phase 5 — Cards, Buttons, Forms, Reusable UI
Unify project cards, buttons, pills, tags, and input-like surfaces into a shared system.

### Phase 6 — Responsive and Accessibility Pass
Test and refine behavior across mobile, tablet, and desktop while improving focus states, contrast, semantics, and interaction comfort.

### Phase 7 — Final QA and Polish
Run final verification, compare before/after visually, confirm no structural regressions, and make small consistency fixes.

## 12. Risks and Guardrails
- Do not remove existing components
- Do not break routing or anchor navigation
- Do not break responsiveness
- Do not change content meaning
- Do not introduce unnecessary dependencies
- Do not hardcode inconsistent colors section by section
- Do not overuse animations or decorative glows
- Do not redesign the site into a different structure
- Do not accidentally remove the optional `Achievements` section from the codebase
- Do not rely on styles that assume Tailwind exists unless Tailwind is intentionally introduced later
- Do not ignore current asset inconsistencies; some project image references are not currently present in `public/`

Current codebase risks observed during analysis:
- `Nav` active state uses `usePathname()` with hash links, so current-section highlighting is unlikely to work as intended
- `Background.tsx` currently triggers lint issues due to `setState` in `useEffect` and `Math.random()` calls during render
- `Achievements.tsx` and `Skills.tsx` contain `any` typing that will fail lint
- `Hero.tsx` uses plain `<img>` instead of `next/image`
- `layout.tsx` and `globals.css` duplicate font-loading responsibilities
- Production build in this environment is blocked by remote Google Font fetching for `Inter`

## 13. Final Expected Outcome
The finished website should look like the same portfolio, not a different product. It should keep the current section structure, components, copy intent, and functionality, but feel substantially more credible, modern, clean, and refined. Typography should become more confident and readable, spacing more consistent, surfaces more cohesive, interactions more polished, and responsive behavior more deliberate. The final result should read as a professional senior-engineer portfolio with a clear visual system rather than a collection of individually styled sections.
