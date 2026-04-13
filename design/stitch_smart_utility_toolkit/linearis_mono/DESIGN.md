# Design System Strategy: The Kinetic Minimalist

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Minimalist."** 

Unlike standard "flat" utility apps, this system rejects the sterile, boxed-in look of traditional grids. We are moving toward a high-end, editorial experience where the UI feels like a living document. The goal is to create a sense of "Quiet Authority"—a tool that is incredibly powerful but feels as light as air. 

We break the "template" look by utilizing **intentional asymmetry** and **tonal depth**. Instead of centering everything, we use generous, purposeful white space to lead the eye. Elements shouldn't just sit on the screen; they should feel nested within an environment of soft light and layered paper.

## 2. Colors: Tonal Atmosphere
Our palette is a sophisticated monochrome study punctuated by a singular, high-voltage energy source.

### The Palette
- **Core Neutral:** The `background` (`#fcf9f8`) and `surface` (`#fcf9f8`) are not pure white; they are slightly warm to prevent eye strain and feel more like premium stationery.
- **The Accent:** `primary` (`#483ff0`) is our "Electric Blue." Use this sparingly. It is a beacon, not a bucket of paint.
- **Contrast:** `on_surface` (`#323232`) provides deep charcoal legibility, softer and more "editorial" than a harsh pure black.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** 
Visual boundaries must be created through background shifts. To separate a header from a body, transition from `surface` to `surface_container_low`. To highlight a feature, place a `surface_container_lowest` card on a `surface_container` background. If you feel the urge to draw a line, use white space instead.

### The "Glass & Gradient" Rule
To elevate the utility from "tool" to "experience," floating elements (like bottom navigation or sticky headers) should utilize **Glassmorphism**. Use `surface` at 80% opacity with a `20px` backdrop-blur. 
For primary CTAs, do not use a flat fill. Apply a subtle linear gradient from `primary` (#483ff0) to `primary_dim` (#3a2ee4) at a 135-degree angle to give the button "soul" and a tactile, curved appearance.

## 3. Typography: The Editorial Voice
We use **Inter** as our typeface, but we treat it with the discipline of a Swiss typographer.

- **The Display Scale:** Use `display-lg` and `display-md` for "Aha!" moments—empty states or major milestones. These should have a slight negative letter-spacing (-0.02em) to feel tight and custom.
- **The Hierarchy of Action:** `title-lg` and `title-md` are your workhorses. They define the "What." 
- **Body & Labels:** `body-md` is the default for utility. For `label-md` and `label-sm`, increase the tracking (letter-spacing) to +0.05em and use uppercase to create an authoritative, "spec-sheet" aesthetic.

Typography is our primary tool for hierarchy. If a screen feels cluttered, your first instinct should be to reduce font size or increase weight, not add a divider.

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to show "height" in a vacuum; we use them to mimic natural light hitting physical layers.

### The Layering Principle
Depth is achieved by stacking `surface-container` tiers:
1. **Base:** `surface` (#fcf9f8)
2. **Section:** `surface_container_low` (#f6f3f2)
3. **Primary Card:** `surface_container_lowest` (#ffffff)

This "Lowest-on-Low" nesting creates a soft, natural lift that feels premium and tactile without the "dirtiness" of heavy shadows.

### Ambient Shadows
When a component must float (e.g., a Modal or FAB), use an **Ambient Shadow**:
- **Color:** A tinted version of `on_surface` at 6% opacity.
- **Blur:** Large and diffused (24px to 40px blur).
- **Y-Offset:** Subtle (4px to 8px).
It should feel like a soft glow of shadow, not a hard drop.

### The "Ghost Border" Fallback
If a container lacks contrast against its background, use a **Ghost Border**: `outline_variant` (#b3b1b1) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_dim`), `xl` (1.5rem) roundedness. Typography: `label-md` bold, uppercase.
- **Secondary:** `surface_container_high` fill with `on_surface` text. No border.
- **Tertiary:** Transparent background, `primary` text. Used for low-priority actions.

### Input Fields
- **Container:** `surface_container` fill, `md` (0.75rem) roundedness. 
- **Interaction:** On focus, the container remains the same, but the `outline` token appears as a 1px "Ghost Border" at 30% opacity.
- **Error:** Use `error` (#9e3f4e) text only. Do not turn the whole box red; it breaks the minimalist harmony.

### Cards & Lists
- **Rule:** **No Dividers.** Separate list items using 16px of vertical white space. 
- **Style:** Cards should use `lg` (1rem) roundedness. If the background is `surface`, the card is `surface_container_lowest`.

### Floating Utility Bar (Signature Component)
A custom component for this app. A narrow, pill-shaped bar (`full` roundedness) that sits at the bottom of the screen using the Glassmorphism rule. It houses primary navigation icons in `secondary` and the "Active Action" in `primary`.

## 6. Do's and Don'ts

### Do
- **Do** use "Optical Centering." Sometimes an icon needs to be 1px higher to *look* centered. Trust your eye over the software.
- **Do** embrace the "Void." If a screen is 60% empty, that is a design choice, not a mistake. It signals ease of use.
- **Do** use `primary` strictly for interactive elements. If it’s blue, it must be tappable.

### Don't
- **Don't** use 100% black. It is too heavy for this "Kinetic Minimalist" aesthetic. Stick to `on_surface`.
- **Don't** use standard "Material Design" shadows. They are too aggressive for this system.
- **Don't** cram icons and text together. Give every element a "breathing zone" of at least 8px on all sides.
- **Don't** use dividers to separate content. If you need a divider, you’ve failed the layout; rethink your white space and background shifts.