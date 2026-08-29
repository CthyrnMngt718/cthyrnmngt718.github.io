# TechGroup Solutions Portfolio V7 — Responsive Client Studio

V7 focuses on three production goals: **device responsiveness**, **reliable project-inquiry delivery**, and a stronger business-facing interaction system. The site remains a static GitHub Pages project with vanilla HTML, CSS, and JavaScript; no build step or server runtime is required.

## What changed in V7

### 1. Responsive across phones, tablets, laptops, desktops, and large displays

The layout now includes dedicated behavior for:

- ultra-wide and large desktop screens
- standard laptops
- compact laptops / landscape tablets
- tablets and mobile drawer navigation
- portrait phones
- narrow 360 px devices
- short-height landscape phones
- touch/coarse-pointer devices
- devices with display cutouts and safe-area insets
- reduced-motion and high-contrast preferences
- print output

Additional safeguards include `min-width: 0` on grid/flex children, long-text wrapping, 16 px mobile form controls to prevent iOS focus zoom, responsive dialog bounds using `100dvh`, safe-area padding, touch-friendly controls, and horizontal-scroll-safe project filters.

### 2. Mobile bottom navigation dock

At phone/tablet widths, visitors get a thumb-friendly bottom dock for:

- Home
- Case Studies
- Project Planner
- Contact

The full advanced sidebar is still available from the menu button. Opening it now adds a backdrop and locks page scrolling so the navigation behaves like a real mobile drawer.

### 3. Production Formspree inquiry flow

The contact form now uses the working Formspree endpoint supplied in the reference implementation:

`https://formspree.io/f/mzepkbgw`

The form is progressive-enhancement friendly:

- with JavaScript enabled, submission uses `fetch()` and stays on the portfolio page;
- with JavaScript disabled, the HTML form still posts directly to Formspree through its `action` and `method="POST"` attributes.

The business contact address displayed throughout the portfolio is:

`tgroupsolutions.dev2026@gmail.com`

**Important:** Formspree controls the notification mailbox on its own dashboard. Front-end HTML cannot select or override the recipient for security reasons. Verify that form ID `mzepkbgw` is configured in Formspree to notify `tgroupsolutions.dev2026@gmail.com`.

### 4. Better inquiry UX and reliability

The form now includes:

- inline field validation
- required project-terms acknowledgement
- organization, budget, timeline, and project type
- optional phone / messaging number
- preferred reply channel
- current project stage
- expected user scope
- Formspree honeypot field
- locally generated inquiry reference such as `TGS-20260829-AB12`
- submission timestamp and source URL
- duplicate-submit protection
- 20-second request timeout
- Formspree rate-limit handling (`429`)
- server-error messaging
- network/offline detection
- automatic local draft saving for up to 14 days
- draft restoration after refresh
- clear-draft control
- mailto fallback link when automatic submission fails
- form values preserved after errors
- success screen only after Formspree returns an accepted response
- “Send another inquiry” workflow after success
- reduced-motion-aware success animation

The page never reports a successful send before Formspree accepts the request.

### 5. Inquiry workflow explanation

The contact section now explains the client flow:

1. Send the project brief.
2. TechGroup Solutions reviews the workflow, platform fit, dependencies, and open questions.
3. The team discusses scope, timeline, deliverables, technical direction, and commercial terms.

### 6. Navigation and interaction retained

V7 retains the advanced V6 features:

- desktop sidebar collapse / expand
- sidebar state persistence
- Ctrl/Cmd + K command palette
- searchable section shortcuts
- keyboard navigation
- live current-section status
- sidebar scroll-progress meter
- dark/light mode
- viewport-centered native case-study dialogs
- portfolio filters
- interactive project planner
- architecture explorer
- section-specific motion
- PWA install support
- reduced-motion handling

## Main files

- `index.html` — portfolio content, responsive navigation, inquiry form, dialogs
- `style.css` — full responsive system, animations, contact states, mobile dock
- `script.js` — interactions, Formspree submission, draft restore, mobile dock, dialogs, planner
- `sw.js` — service worker cache `tgs-portfolio-v7-1`
- `site.webmanifest` — installable TGS web-app metadata
- `images/` — hero, logo, and social preview assets
- `case-studies/` — four project case-study pages
- favicon / Apple touch / PWA icon files — supplied TGS identity assets

## Formspree setup check

Before publishing, sign in to the Formspree account that owns form ID `mzepkbgw` and verify its notification destination is:

`tgroupsolutions.dev2026@gmail.com`

No SMTP password, Gmail password, API secret, or private credential belongs in this GitHub Pages repository.

## Deployment

Upload the **contents** of this folder to the root of the GitHub Pages repository.

After deployment:

1. Open the portfolio in a private/incognito window.
2. Send one real test inquiry with a clearly marked test subject.
3. Confirm the success screen appears only after the request completes.
4. Confirm the submission appears in the Formspree dashboard.
5. Confirm the notification reaches `tgroupsolutions.dev2026@gmail.com`.
6. Test phone, tablet, and desktop layouts.
7. Hard-refresh once if an older service-worker cache is still visible.

V7 uses a new service-worker cache name, so older portfolio caches are removed during activation.
