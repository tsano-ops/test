# PlanAfter Agent Team

Your AI team of 12 specialists for building and growing PlanAfter.

## Setup

```bash
cd agents
npm install
export ANTHROPIC_API_KEY=your_key_here
```

Get your API key at: https://console.anthropic.com/

## Run

```bash
npx tsx index.ts
```

## Your Team

| Agent | Emoji | What they do |
|-------|-------|-------------|
| Product | 🗺️ | Feature specs, user stories, roadmap |
| Frontend | 🎨 | React/TypeScript UI, Figma-to-code |
| Backend | ⚙️ | NestJS API, Prisma, auth, security |
| QA | 🧪 | Testing, bug analysis, edge cases |
| Researcher | 🔬 | Competitors, legal/regulatory, certifications |
| Security | 🔒 | Security audits, GDPR, encryption |
| Psychologist | 💙 | Grief-informed UX, empathetic design |
| Copywriter | ✍️ | UI copy, landing pages, emails |
| Marketing | 📣 | Campaigns, social media, GTM strategy |
| SEO | 🔍 | Keywords, technical SEO, content |
| WordPress | 🌐 | Marketing site, landing pages, blog |
| Growth | 📈 | Metrics, pricing, conversion, retention |

## Usage

**Auto-route** (Claude picks the right expert):
```
You → build the assets management feature
You → write the homepage hero copy
You → what GDPR requirements do we need for EU users?
```

**Direct agent** (talk to a specific specialist):
```
You → @seo write meta description for the pricing page
You → @psychologist review the onboarding copy for sensitivity
You → @security audit the JWT implementation
You → @wordpress design the homepage structure
```

**List all agents:**
```
You → /list
```
