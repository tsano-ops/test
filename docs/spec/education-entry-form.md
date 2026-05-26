# Education Add New Entry Form — XD Spec (LOCKED)

> Provided by Violetka 2026-04-26. Coordinates relative to 1920×1080 XD artboard. Asset paths resolved.

---

## Containers (form pad)

**Form pad (collapsed-state initial container):**
- top:1184 left:660 — 600 × 176
- background: #FFFFFF
- border: 1px solid #FFFFFF
- border-radius: 30
- backdrop-filter: blur(10)
- opacity: 1

**Form pad (expanded after category chosen — variable height):**
- Same container grows downward as more fields appear.

---

## Form title

**"About This Education Entry":**
- top:1214 left:760 — 400 × 17
- font: Inter normal 14/17
- color: #000 opacity 0.5
- text-align: center

---

## Cancel × close button (greyscale — for entry form)

**Hover-reveal pad (60×60):**
- top:1184 left:1200 — 60 × 60
- background: #FFFFFF (opacity 0 default → 1 on hover)
- border: 1px solid #FFFFFF
- Glass Circle Solidifies on Hover pattern

**Cancel icon (20×20):**
- top:1204 left:1220 — 20 × 20
- asset: `img/cancel-grey.svg` (saved from Cancel (4).svg from Downloads)
- opacity: 0.5 default → 1 on hover

**This is GREY** (50% opacity). The Document Preview uses `cancel-white.png`. Two separate assets for two contexts.

---

## Category picker (Default state)

**Picker hit area (60 tall):**
- top:1251 left:760 — 400 × 60
- transparent background
- Tap → opens expanded dropdown

**Default value text "Select Category":**
- top:1271 left:780 — 332 × 20
- font: Inter 600 16/24 #000 opacity 1

**Required asterisk "*":**
- top:1315 left:780 — 6 × 15
- font: Inter 600 12/15 color #FF0000

**Caption "Category":**
- top:1315 left:790 — 51 × 15
- font: Inter normal 12/15 #000 opacity 0.5

**Drop arrow (8×4 chevron):**
- top:1279 left:1132 — 8 × 4
- asset: `img/drop-arrow.png` (existing canonical chevron)

---

## Category picker (Expanded dropdown)

**Dropdown panel:**
- top:1321 left:760 — 400 × 120
- background: #FFFFFF
- border-radius: 10
- opacity: 1
- Esc key closes back to default state

**Options (3 categories):**
1. **Educational Qualification** — top:1341 left:780 — 332×20 — Inter 16/24 normal #000
   - Tap → "Add New Educational Qualification" expanded form
2. **Professional Certification** — top:1371 left:780 — same style
   - Tap → "Add New Professional Certification" form
3. **Other Education** — top:1401 left:780 — same style
   - Tap → "Add New Other Education" form

Drop arrow rotates back on close.

---

## Add New Educational Qualification — full form (after category chosen)

### Category row (now showing "Educational Qualification" as picked value)
- Hit area top:1251 left:760 — 400×60
- Value "Educational Qualification" — top:1271 left:780, Inter 600 16/24
- Asterisk + "Category" caption — same as default state

### Education Level (required dropdown)
- Hit area top:1350 left:760 — 400×60
- Default value "Select Level" — top:1370 left:780, Inter 600 16/24
- Drop arrow — top:1378 left:1132
- Asterisk * top:1414 left:780
- Caption "Education Level" — top:1414 left:790, Inter 12/15 op 0.5

### Degree (optional text input)
- Hit area top:1449 left:760 — 400×60
- Value "Degree" placeholder — top:1469 left:780 — 360×20, Inter 600 16/24
- Caption "Degree / Specialisation" — top:1513 left:780 — 128×15, Inter 12/15 op 0.5
- (No asterisk — optional)

### Institution Name (required text input)
- Hit area top:1548 left:760 — 400×60
- Value "Institution Name" placeholder — top:1568 left:780, Inter 600 16/24
- Asterisk * top:1612 left:780
- Caption "Institution Name" — top:1612 left:790, Inter 12/15 op 0.5

### Country (optional dropdown)
- Hit area top:1647 left:760 — 400×60
- Default "Select Country" — top:1667 left:780, Inter 600 16/24
- Drop arrow — top:1675 left:1132
- Caption "Country" — top:1711 left:780 — 45×15, Inter 12/15 op 0.5

### City (optional text input)
- Hit area top:1746 left:760 — 400×60
- Value "City" placeholder — top:1766 left:780, Inter 600 16/24
- Caption "City / Town" — top:1810 left:780 — 63×15, Inter 12/15 op 0.5

---

## Adaptive Timeline Builder

### Section title
- "Adaptive Timeline Builder - Timeline & Milestones" — top:1855 left:760 — 400×17, Inter normal 14/17 #000 op 0.5, text-align center

### Timeline pill (default — variable width to fit text + icon)

**Example: "Add Start Date" pill (default, 182 wide):**
- Outer pad: top:1892 left:760 — 182 × 50, #FFFFFF54 (white 33%), border 1px white, radius 25
- Hit area: top:1892 left:760 — 162 × 50 (inside pad)
- Plus icon hover-reveal circle: top:1892 left:760 — 50 × 50, #FFFFFF, radius 25, opacity 0 default
- Plus icon (8×8): top:1913 left:781 — 8×8, asset `img/plus-icon.svg` (saved from plus (2).svg)
- Label "Add Start Date" — top:1907 left:810 — 112×20, Inter 600 16/20 #000

**"Add Graduation Date" pill (default, 229 wide — text wider so pill wider):**
- Outer pad: top:1952 left:760 — 229 × 50
- Hit area: 209 × 50
- Plus circle 50×50 (hover reveal)
- Plus icon at top:1973 left:781
- Label "Add Graduation Date" — top:1967 left:810 — 159×20

**Pill rule:** width = 50 (icon area) + label width + ~10 right padding. Variable per text.

### Timeline expanded panel (after pill clicked — Add Start Date example)

**Container:**
- top:1892 left:660 — 600 × 268
- background: #FFFFFF opacity 0.5

**Header "Add Start Date":**
- top:1912 left:780 — 112×20, Inter 600 16/20 #000

**Year* dropdown (required):**
- Hit area: top:1952 left:760 — 113 × 60
- "Year *" value text — top:1972 left:780, Inter 600 16/24
- Drop arrow — top:1980 left:845

**Month dropdown:**
- Hit area: top:1952 left:893 — 149 × 60
- "Month" value text — top:1972 left:913, Inter 600 16/24
- Drop arrow — top:1980 left:1014

**Day dropdown:**
- Hit area: top:1952 left:1062 — 98 × 60
- "Day" value text — top:1972 left:1082, Inter 600 16/24
- Drop arrow — top:1980 left:1132

**Caption (category-driven):**
- "When the Education Started" — top:2016 left:780 — 156×15, Inter 12/15 op 0.5

**Cancel × inside expanded:**
- 60×60 hover-reveal pad: top:1892 left:1200, opacity 0 default
- Cancel icon 20×20: top:1912 left:1220, asset `img/cancel-grey.svg` (or PNG), opacity 0.5

**Add Context input:**
- Hit area: top:2051 left:760 — 400 × 60
- Default "Add Context…" placeholder — top:2071 left:780, Inter 600 16/24
- Caption "Details & Notes" — top:2115 left:780, Inter 12/15 op 0.5

**Add Graduation Date pill (still collapsed below the expanded Start Date):**
- top:2170 left:760 — 229×50, same pill styling
- Tap → expand similarly

### Read mode for filled timeline
(per earlier spec — "Start Date - 2025" + context box + "Details & Notes" caption)

---

## Documentation & Storage section title
- top:2250 left:760 — 400×17, Inter normal 14/17 #000 op 0.5, text-align center

---

## Pattern principles

- All field rows: 400 wide × 60 tall hit area
- Value at top:+20 left:+20 from row top-left
- Caption at bottom-left of row, with optional asterisk (#FF0000 600 12/15) immediately before caption text
- Required fields: asterisk * shows; optional fields: no asterisk
- Drop arrow: 8×4 px, positioned at top:+28 right:20 of the dropdown row (so left:1132 from left:760 = 372 inset from row-left, so 28 from row-right)

## Read mode (already specced)
- Section group titles: Inter 600 16/24 #000 opacity 0.5 centered
- Entry row card: collapsed view shows icon circle + Title + meta line + timeline chip + status indicator + ⋯ menu
- Hover: thin top + bottom dividers
- Click expanded: shows fields above (value bold + caption below)
