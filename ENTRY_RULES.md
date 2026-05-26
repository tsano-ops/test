# Entry Rules — Canonical reference

**Purpose:** When you create a new entry, the system automatically picks the right icon and color. These rules NEVER get overridden per-entry — the data drives the visual presentation.

**Source of truth:** `html-prototype/_data/entryRules.js`

---

## 1. Status Color (depends on file + location)

A document entry has 3 possible status states based on whether you uploaded a digital file AND/OR specified a physical location:

| State | Color | Hex | Used when |
|-------|-------|-----|-----------|
| 🟢 **Digital File & Location** | Green | `#61C553` | Both: file uploaded AND location specified |
| 🔵 **Digital File** | Blue/Purple | `#667EEA` | File uploaded only (no physical location) |
| 🟠 **Location** | Orange | `#FF9500` | Location specified only (no file uploaded) |
| ⚪ Empty | Grey | `#CCCCCC` | Neither (placeholder ring) |

**Helper:** `window.entryStatusKey(entry)` returns one of `'both' | 'digital' | 'location' | 'none'`.

**Where applied:** Status dot color, icon circle border color, status label text. Same colors on every render: card view, Documents tab, Vault, linked-person card.

---

## 2. Entry Icon (depends on card + subcategory)

The icon shown inside the 60×60 entry circle. Resolved by `cardKey + subcategory` lookup:

### Essential Info card
- All subcategories (Passport, ID Card, Driver's License, Birth Certificate, etc.) → `img/document.png` (16×20)

### Family & Relationships card
- All subcategories (Marriage, Divorce, Prenup, etc.) → `img/document.png` (16×20)

### Medical Info card
| Subcategory | Icon | Size |
|-------------|------|------|
| Blood Type | `img/drop.png` | 16×20 |
| Allergy | `img/shield-allergy.png` | 20×20 |
| Medical Condition | `img/pill.png` | 20×20 |
| Medical Device | `img/activity.png` | 20×20 |
| (others) | `img/document.png` | 16×20 |

### Education card
- All subcategories (Educational Qualification, Professional Certification, Other Education) → `img/education.png` (20×20)

### Employment & Affiliations card
| Subcategory | Icon | Size |
|-------------|------|------|
| Employment | `img/goal.png` | 20×20 |
| Membership | `img/crown.png` | 24×20 |
| Professional License | `img/document.png` | 16×20 |

### Beliefs, Hobbies & Interests card
| Subcategory | Icon | Size |
|-------------|------|------|
| Belief | `img/heart.png` | 20×18 |
| Hobby | `img/star.png` | 20×20 |
| Interest | `img/puzzle.png` | 20×20 |

**Helper:** `window.entryIcon(entry)` returns `{ src, size }`.

---

## 3. Group Title (section header in Documents tab / Vault)

When entries are aggregated, they are grouped under canonical section titles:

| cardKey + subcategory | Group title |
|-----------------------|-------------|
| essential | Identity & Vital Documents |
| family | Relationship & Status Documents |
| medical:Blood Type | Blood Type |
| medical:Allergy | Allergies |
| medical:Medical Condition | Medical Conditions |
| medical:Medical Device | Medical Devices & Implants |
| education:Educational Qualification | Educational Qualifications |
| education:Professional Certification | Professional Certifications |
| education:Other Education | Other Educations |
| employment:Employment | Employment Entries |
| employment:Membership | Memberships & Affiliations |
| beliefs:Belief | Beliefs |
| beliefs:Hobby | Hobbies |
| beliefs:Interest | Interests |

**Helper:** `window.entryGroupTitle(entry)` returns the group title string.

---

## 4. Convenience: full resolve in one call

```js
const visuals = window.entryVisuals(entry);
// returns:
// {
//   status: 'both' | 'digital' | 'location' | 'none',
//   statusLabel: 'Digital File & Location' | 'Digital File' | 'Location' | '',
//   colorHex: '#61C553',
//   colorClass: 'status-both',
//   iconSrc: 'img/document.png',
//   iconSize: '16x20',
//   groupTitle: 'Identity & Vital Documents'
// }
```

---

## 5. Locked rules — DO NOT override

When implementing a new card or entry type:

1. **Add to `entryRules.js` first.** Never hardcode an icon/color in HTML or in a render function.
2. **Use the helpers (`entryStatusKey`, `entryIcon`, `entryVisuals`)** — never reach into `entry.hasFile` directly in a renderer.
3. **No per-entry color overrides.** Color is 100% derived from `hasFile + hasLocation`. If a user wants a different color, they change those properties, not the color directly.
4. **Same icon size everywhere.** Don't make a Blood Type icon 24×24 in the Vault but 16×20 in the card. The icon registry has ONE size per type.
5. **Cross-record consistency.** When an entry shows on the linked person's card (e.g. Marriage Certificate on John's record), it uses the SAME icon + color as on Sarah's record. Both render through `entryVisuals(entry)`.

---

## 6. Examples — Sarah's entries

| Entry | cardKey | subcategory | hasFile | hasLocation | Color | Icon |
|-------|---------|-------------|---------|-------------|-------|------|
| US Passport – Sarah Johnson | essential | Passport | ✅ | ✅ | 🟢 Green | document.png |
| My Driver's License | essential | Driver's License | ✅ | ❌ | 🔵 Blue | document.png |
| AB+ | medical | Blood Type | ✅ | ✅ | 🟢 Green | drop.png |
| Peanuts | medical | Allergy | ❌ | ✅ | 🟠 Orange | shield-allergy.png |
| Asthma | medical | Medical Condition | ✅ | ✅ | 🟢 Green | pill.png |
| Pacemaker/ICD | medical | Medical Device | ✅ | ✅ | 🟢 Green | activity.png |
| Harvard University | education | Educational Qualification | ✅ | ✅ | 🟢 Green | education.png |
| Founder & CEO | employment | Employment | ✅ | ✅ | 🟢 Green | goal.png |
| Rotary Club | employment | Membership | ❌ | ✅ | 🟠 Orange | crown.png |
| Christian — Catholic | beliefs | Belief | ✅ | ✅ | 🟢 Green | heart.png |
| Oil Painting | beliefs | Hobby | ❌ | ✅ | 🟠 Orange | star.png |

The 11 examples above demonstrate every status × subcategory combination Sarah uses. New entries always follow the same rule.
