---
name: Sudharsan Durai Sridevi portfolio
description: A findings report in four metals, where every number carries its source.
colors:
  black: "#0A0B0D"
  black-deep: "#050506"
  black-lift: "#16181D"
  navy: "#0E1C36"
  navy-deep: "#0A1428"
  navy-glow: "#1E3561"
  silver: "#C8CCD2"
  silver-lo: "#A3A9B1"
  silver-mid: "#B4BAC1"
  silver-hi: "#DDE0E4"
  gold: "#E8C766"
typography:
  name:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.75rem, 4.4vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.04
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.2vw, 3.625rem)"
    fontWeight: 600
    lineHeight: 1.06
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 600
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
  metric:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "2.25rem"
    fontWeight: 700
    fontFeature: "tnum"
  source:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  md: "8px"
  inner: "4px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "16px"
  s4: "24px"
  s5: "32px"
  s6: "48px"
  s7: "64px"
components:
  button-resume:
    textColor: "{colors.black}"
    rounded: "{rounded.md}"
    padding: "16px 24px"
    typography: "{typography.body}"
  link-ghost:
    textColor: "{colors.silver}"
  chip-on-silver:
    backgroundColor: "{colors.black}"
    textColor: "{colors.silver}"
    rounded: "{rounded.md}"
    padding: "4px 16px"
  chip-on-black:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.gold}"
    rounded: "{rounded.md}"
    padding: "4px 16px"
  panel-black:
    backgroundColor: "{colors.black}"
    textColor: "{colors.silver}"
    rounded: "{rounded.md}"
    padding: "24px"
  panel-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.gold}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Sudharsan Durai Sridevi portfolio

## Overview

**Creative North Star: "The Findings Report in Metal"**

The page is built like the contract auditor it leads with: each project is a finding, each number sits on a source line, and failures stay on the page. The material world is four metals laid flat side by side: grained near-black, deep midnight navy under a soft radial light, horizontally brushed silver, and a glittering gold that is spent only where it means "this is the thing to look at".

Bands alternate black and silver, with navy for the flagship and the close. Inside each band, the colour that isn't the band or its text appears only as a surface (a chip or a panel), never as text. The hero is three flat pieces tiled edge to edge: black holds a gold-framed photo, a rounded navy shape bounded by one elliptical arc holds the name and the resume button, and silver fills the valley below.

**Key Characteristics:**
- Four colours, no white.
- One 8px corner everywhere; nested corners subtract the padding.
- Script-italic serifs for the name and headings, a news serif for reading, mono only for numbers and their sources.
- Every metric carries a source caption.
- Motion is feedback plus one slow metallic sweep; all of it stops for reduced motion.

## Colors

Four metals, each with a light and dark stop for surfaces and a single solid value for text.

### Primary
- **Glitter Gold** (`gold`): solid gold for headings on black, body text on navy, links on dark bands and small metrics. As a metal (gradient #C99F3A to #FBE7A6 with light-catching glints) only on the name, the resume button, the lead metric and the photo frame.

### Neutral
- **Grained Near-Black** (`black`, `black-deep`, `black-lift`): band surface with fine grain and a radial lift; body text on silver; panels on navy and silver bands.
- **Midnight Navy** (`navy`, `navy-deep`, `navy-glow`): flagship, contact and hero shape, lit from the top right; chips and panels inside black bands.
- **Brushed Silver** (`silver-lo` to `silver-hi`): band surface with horizontal grain and a highlight band. `silver` is the text value: body on black, headings and secondary links on navy.

### Named Rules
**The Role Table Rule.** On black: silver body, gold headings. On navy: gold body, silver headings. On silver: black body, navy headings. Gold never sits on silver.

**The Third Colour Rule.** A band's third colour appears only as a surface (navy chips/panels on black; black chips/panels on navy and silver), never as text.

**The Metal Budget Rule.** The gold metal is for the name, the resume button, the single lead metric and the photo frame. Everything else gold is solid.

## Typography

**Display Font:** Playfair Display Italic 600 (name only)
**Headline Font:** Cormorant Garamond Italic 600
**Body Font:** Newsreader (variable, optical size on)
**Mono Font:** JetBrains Mono 500/700

**Character:** two script-leaning italics give the premium voice; Newsreader keeps long copy plain and readable; mono marks anything you could check.

### Hierarchy
- **Name** (600, clamp 2.75 to 5rem, 1.04): hero only, two lines.
- **Headline** (600, clamp 2.5 to 3.625rem; flagship and contact up to 4.25rem): one per band, `text-wrap: balance`.
- **Title** (600, 1.75rem): sub-sections, timeline roles, education.
- **Body** (400, 1.1875rem, 1.6, max 60ch): all reading text.
- **Metric** (700 mono, 2.25rem; lead metric clamp 5.5 to 10rem; tabular figures).
- **Source** (500 mono, 0.875rem): the line under every number.

### Named Rules
**The Source Line Rule.** No number ships without a file or page named under it.

**The Mono Means Measured Rule.** Mono is for metrics and source captions only, never for quotes or labels.

## Layout

Content sits in a 1200px wrap with 64px side padding (24px under 980px). Spacing comes only from 4 / 8 / 16 / 24 / 32 / 48 / 64. Bands pad 64px top and bottom. Groups are made with space; the few boxes are third-colour panels. The hero fills the viewport height (800 to 960px) above 1200px; at 1200px and below its three pieces stack (photo, then name and actions, then the availability line) joined by simple arcs. Above 1200px the hero text and photo are positioned by measurement against the arc so nothing crosses a boundary. Project bands use two columns that collapse at 980px.

## Elevation & Depth

Flat. Depth comes from the materials themselves (grain, radial light, the brushed highlight band) and from tonal contrast between bands, not from shadows. The hero's boundaries are clean flat edges with no stroke, shadow or glow.

### Named Rules
**The Flat Seams Rule.** Regions meet edge to edge like puzzle pieces; nothing floats above another.

## Shapes

One corner: 8px on buttons, chips, panels, screenshots, videos and the photo frame; the photo inside its 4px frame uses 4px. The hero uses one elliptical arc for navy's whole left and bottom edge; the black/silver edge rises from the left and meets it at the junction.

## Components

### Buttons
- **Resume button:** the only filled button. Gold metal with glints, black text, 8px corner, 16px by 24px padding, download icon. Hover brightens slightly; press shifts down 1px.
- **Ghost links (GitHub, Copy email, LinkedIn):** silver text with a 1px underline that thickens on hover. No gold.

### Chips
- **Style:** solid third-colour fill, 8px corner, 4px by 16px. Stack and skills lists only; not interactive.

### Cards / Containers
- **Panels:** third-colour surfaces with 24px padding (16px under 360px) for metric ledgers, the score table, charts, the state diagram and education.

### Navigation
- **Sticky bar:** black, 56px tall, appears once the hero leaves the screen and is inert until then. Silver section links with a gold underline on hover/focus, a gold "Resume" download on the right. Slides in over 0.32s, appears instantly under reduced motion.

### Evidence block (signature)
- A large glittering lead metric with its description and source line, followed by a black panel of secondary metrics, each with its own source line.

## Do's and Don'ts

### Do:
- **Do** caption every number with its source file, notebook section or LinkedIn.
- **Do** credit team work in the "who" line before describing it.
- **Do** keep 16px clear between hero text and any boundary.
- **Do** give images width, height and a fallback message.

### Don't:
- **Don't** use white, or any colour outside the four metals.
- **Don't** put gold on silver.
- **Don't** add a filled button for any action other than the resume, or spread the gold metal past its four uses.
- **Don't** add shadows or strokes to the hero seams.
- **Don't** italicise words inside body copy.
