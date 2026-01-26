# Next360 Organics - Brand Kit

## 1. Brand Essence

- **Core Values**: Organic, Trustworthy, Premium, Community-Focused.
- **Personality**: Grounded, Calm, Modern, Reliable.
- **Visual Style**: Minimalist, "From the Earth", Clean Lines, Ample Whitespace.

## 2. Color Palette

### Primary Colors (From Logo)

| Role              | Color Name        | Hex       | Usage                                                 |
| ----------------- | ----------------- | --------- | ----------------------------------------------------- |
| **Brand Primary** | **Next360 Green** | `#4A6741` | Primary Actions, Buttons, Logo Marks. Earthy & Deep.  |
| **Brand Dark**    | **Charcoal Soil** | `#262A2B` | Headings, Main Text, Borders. Softer than pure black. |
| **Brand Light**   | **Organic Cream** | `#F5F5F0` | Page Backgrounds, Card Backgrounds (Subtle).          |

### Secondary & Accent Colors

| Role          | Color Name       | Hex       | Usage                                      |
| ------------- | ---------------- | --------- | ------------------------------------------ |
| **Secondary** | **Sage Leaf**    | `#8AA881` | Secondary Buttons, Illustrations, Accents. |
| **Accent**    | **Harvest Gold** | `#D4A373` | Subtle Highlights, "New" badges, Warmth.   |
| **Neutral**   | **Stone Gray**   | `#E5E7EB` | Borders, Dividers, Inactive States.        |
| **White**     | **Pure White**   | `#FFFFFF` | Card Surfaces, Inputs.                     |

### Semantic Colors

| Role        | Hex       | Usage                              |
| ----------- | --------- | ---------------------------------- |
| **Success** | `#4A6741` | Same as Primary (Brand alignment). |
| **Warning** | `#E9C46A` | Alerts, Pending States.            |
| **Error**   | `#D64045` | Validation Errors (Keep muted).    |

## 3. Typography System

**Font Family**: `Inter` (Google Font) or `Geist Sans` (Next.js Default) - Clean, Modern, Legible.
_Option: `Outfit` for Headings to add a premium standout feel._

### Headings (Outfit/Inter)

- **H1**: 48px / 64px (Desktop/Mobile) - ExtraBold - _Hero Headlines_
- **H2**: 36px / 48px - Bold - _Section Titles_
- **H3**: 24px / 32px - SemiBold - _Card Titles_
- **H4**: 20px / 28px - Medium - _Subsections_

### Body (Inter)

- **Body Large**: 18px - _Intro text, Lead paragraphs_
- **Body Base**: 16px - _Standard content_
- **Body Small**: 14px - _Meta data, footer links_
- **Caption**: 12px - _Labels, tiny details_

## 4. Spacing & Layout

**Base Unit**: 4px

- **Container Width**: `max-w-7xl` (1280px) centered.
- **Section Padding**: `py-16` (Desktop), `py-10` (Mobile).
- **Component Gap**: `gap-6` or `gap-8`.
- **Border Radius**:
  - `rounded-lg` (8px): Standard Buttons/Inputs.
  - `rounded-2xl` (16px): Cards, Modals.
  - `rounded-full`: Pills, Avatars.

## 5. UI Component Styles

### Buttons

- **Primary**: `bg-[#4A6741] text-white hover:bg-[#3D5536] shadow-lg hover:shadow-xl transition-all`
- **Secondary**: `bg-[#F5F5F0] text-[#262A2B] hover:bg-[#E5E5E0] border border-[#262A2B]/10`
- **Outline**: `border border-[#4A6741] text-[#4A6741] hover:bg-[#4A6741]/5`

### Cards

- **Style**: White background, `rounded-2xl`, subtle border `border-stone-100`, soft shadow `shadow-sm hover:shadow-md`.
- **Interaction**: Gentle lift on hover (`-translate-y-1`).

### Shadows

- **Soft**: `0 4px 20px rgba(0,0,0,0.05)` - _Natural, diffused light._
