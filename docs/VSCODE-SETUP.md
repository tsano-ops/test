# VS Code Setup for PlanAfter

## Claude Extension (Claude Code in VS Code)
Already connected — Claude Code runs in the terminal panel inside VS Code.
The project folder is open and all CLAUDE.md context files are automatically loaded.

## Recommended VS Code Extensions
- **Prisma** — syntax highlighting for schema.prisma
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **ESLint** — code quality
- **Prettier** — code formatting
- **Thunder Client** — test API endpoints without leaving VS Code

## Workspace Tips
- Open terminal in VS Code → run `npm run dev` to start both servers
- To run the AI agent team: open a second terminal → `cd agents && npx tsx index.ts`
- The `.claude/` folder stores all Claude settings and memory (do not delete)
