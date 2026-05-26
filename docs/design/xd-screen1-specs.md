# XD Screen 1 — My Profile Verification — EXACT SPECS

## Layout (1920x1080, 4-column fixed)
- Sidebar: x:320, width:300
- Main content: x:660, width:600
- Black bar: x:1210, width:50
- AI Panel: x:1300, width:300
- Content starts at y:100 (header is 90px)

## Profile Header Card (#22)
- 600x308 at x:660 y:100
- bg: #FFFFFF, shadow: 0px 10px 30px #00000029
- border: 1px solid #FFFFFF, radius: 30px
- backdrop-filter: blur(10px)

### Gradient Top (#03)
- 600x154 at x:660 y:100
- bg: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)
- radius: 30px 30px 0px 0px

### Back Button (#04-05)
- Pad: 60x60 at x:690 y:130, bg: #FFFFFF, radius: 30px, opacity: 0
- Hover: opacity 1, transition: Ease Out 0.2s
- Text "Back": 37x20 at x:750 y:150, Inter Regular 16px/24px, #000000

### Avatar Wrap (#11)
- 80x80 at x:680 y:200, bg: #FFFFFF, opacity: 0.33

### Profile Image (#16)
- 60x60 at x:690 y:210, circular

### Title Group (#17)
- 143x43 at x:770 y:216
- "Sarah Johnson": Inter SemiBold 20px/24px, #000000

### Breadcrumb (#86)
- 140x15 at x:770 y:244

### Date of Birth (#23-24)
- Label "Date of Birth:": Inter Regular 12px/15px, #000000, opacity 0.5
- Value "July 22, 1980": 89x17, Inter SemiBold 14px/17px, #000000

### Age (#25-26)
- Label "Age:": Inter Regular 12px/15px, #000000, opacity 0.5
- Value "45": 18x17, Inter SemiBold 14px/17px, #000000

### Role (#27-28)
- Label "Role in Your Plan:": 97x15, Inter Regular 12px/15px, #000000, opacity 0.5
- Value "Plan Owner": 77x17, Inter SemiBold 14px/17px, #000000

### Shared To (#31-33)
- Label "Shared To:": 60x15, Inter Regular 12px/15px, #000000, opacity 0.5
- Avatars: 40x40 each at x:854/874 y:338, overlapping

## Black Bar (#12)
- 50x308 at x:1210 y:100
- bg: #000000, radius: 0px 30px 30px 0px

### Icons inside black bar (white, opacity 0.5, hover → 1)
- Verification info (#84): 20x20 at x:1225 y:150, border 2px solid #FF0000
- User-plus (#87): 20x20 at x:1225 y:248, border 2px solid #FFFFFF, opacity 0.5
- Download (#29-30): pad 50x50 at x:1210 y:283, opacity 0
- Share (#34-35): 20x16 at x:1225 y:350, border 2px solid #FFFFFF, opacity 0.5

## AI Panel (#09)
- 300x400 at x:1300 y:100
- bg: #020B66, shadow: 0px 10px 30px #00000029, radius: 30px

### AI Title
- "PlanAfter AI Assistant": Inter SemiBold 20px/24px, #FFFFFF

### AI Subtitle (#10)
- "Ready to help with your planning": 182x15, Inter Regular 12px/15px, #FFFFFF, opacity 0.5

### Green Dot (#20)
- 8x8 at x:1310 y:241, bg: #61C553

### AI Message (#13-14)
- Container: 282x148 at x:1303 y:171
- Bubble pad: 242x108 at x:1323 y:191
- bg: #FFFFFF, shadow: 0px 10px 20px #00000014
- radius: 20px 20px 20px 0px, blur(10px)
- Text (#21): 202x68, Inter Regular 14px/17px, #FFFFFF (on navy bg outside bubble)

### AI Input (#39)
- 220x50 at x:1310 y:430
- bg: #FFFFFF, shadow: 0px 10px 20px #00000014
- border: 1px solid #FFFFFF54, radius: 30px, blur(10px)

### AI Send Button (#40)
- 50x50 at x:1540 y:430
- bg: #FFFFFF, shadow: 0px 10px 20px #00000014
- border: 1px solid #FFFFFF54, blur(30px)

## Sidebar
### Photo Pad (#82)
- 300x275 at x:320 y:100
- bg: #FFFFFF, border: 1px solid #FFFFFF
- radius: 30px 30px 0px 0px, blur(10px)

### Add Photo Circle (#81)
- 180x180 at x:380 y:160, bg: #FFFFFF, opacity: 0.33
- Hover: opacity 1, Ease Out 0.2s

### Name (#36)
- "Sarah Johnson": 138x28 at x:401 y:385
- Source Serif 4 Medium 20px/28px, #000000, text-align: center

### Name Pad (#37)
- 300x65 at x:320 y:375
- bg: #FFFFFF, shadow: inset 0px -1px 1px #00000029

### Plan Strip (#38)
- 300x24 at x:320 y:440
- bg: linear-gradient(270deg, #61C553 0%, #31632A 100%)
- shadow: inset 0px 0px 6px #00000029
- 7 states: Default, Individual, Individual Hover, Family, Family Hover, Premium, Premium Hover

### Menu Pad (#71)
- 300x586 at x:320 y:464
- bg: #FFFFFF, border: 1px solid #FFFFFF
- radius: 0px 0px 30px 30px, blur(10px)

## KYC Verification Section (#43-80)
### Container (#61)
- 600x718 at x:660 y:501
- bg: #FFFFFF, shadow: 0px 10px 30px #00000029
- border: 1px solid #FFFFFF, radius: 30px, blur(10px)
- 6 states: Default, Uploading Progress, Uploading Complete, Face Match, Liveness Detection, Processing

### Gradient Top (#43)
- 600x359 at x:660 y:501
- linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)
- radius: 30px 30px 0px 0px

### Title (#46)
- "KYC Verification Flow": 206x24 at x:857 y:551
- Inter SemiBold 20px/24px, #000000, text-align: center

### Subtitle (#48)
- "Verification is required...": 400x40 at x:760 y:585
- Inter Regular 16px/20px, #000000, opacity 0.5, text-align: center

### Steps Card (#52)
- 400x96 at x:760 y:655
- bg: #FFFFFF, shadow: 0px 10px 20px #00000014
- border: 1px solid #FFFFFF, radius: 20px, blur(10px)

### Step Title (#58)
- "1. ID Upload (OCR)": 174x24 at x:760 y:781
- Inter SemiBold 20px/24px, #000000

### Step Description (#59)
- 400x34 at x:760 y:825
- Inter Regular 14px/17px, #000000

### Drag Drop Frame (#62)
- 400x96 at x:760 y:879
- bg: #FFFFFF80, border: 1px dashed #00000029, radius: 20px

### Continue Button (#78-80)
- Text "Continue": 67x20 at x:1073 y:1149, Inter Regular 16px/24px, #000000, opacity: 0.33
- Pad: 60x60 at x:1170 y:1129, bg: transparent, border: 1px solid #000000, radius: 30px, opacity: 0.33
