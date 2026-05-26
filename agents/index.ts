#!/usr/bin/env node
import * as readline from "readline";
import { AGENTS, AgentKey, routeTask, runAgent } from "./orchestrator.js";

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

function printHeader() {
  console.log(`
${COLORS.cyan}${COLORS.bright}╔════════════════════════════════════════════════════╗
║          ∞  PlanAfter Agent Team  ∞               ║
╚════════════════════════════════════════════════════╝${COLORS.reset}
`);
}

function printAgentList() {
  console.log(
    `${COLORS.bright}Your team (12 specialists):${COLORS.reset}\n`
  );
  for (const [key, agent] of Object.entries(AGENTS)) {
    console.log(
      `  ${agent.emoji}  ${COLORS.bright}${agent.name.padEnd(14)}${COLORS.reset} ${COLORS.gray}${agent.description}${COLORS.reset}`
    );
  }
  console.log(`
${COLORS.gray}Commands:
  Just type your task → auto-routed to the right agent(s)
  @agent <task>       → talk to a specific agent (e.g. @seo write meta description)
  /list               → show all agents
  /exit               → quit${COLORS.reset}
`);
}

function parseDirectAgent(input: string): {
  agentKey: AgentKey | null;
  task: string;
} {
  const match = input.match(/^@(\w+)\s+(.*)/s);
  if (!match) return { agentKey: null, task: input };

  const key = match[1].toLowerCase() as AgentKey;
  if (key in AGENTS) {
    return { agentKey: key, task: match[2] };
  }
  return { agentKey: null, task: input };
}

async function handleTask(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return;

  if (trimmed === "/list") {
    printAgentList();
    return;
  }

  const { agentKey: directKey, task } = parseDirectAgent(trimmed);

  let agentKeys: AgentKey[];

  if (directKey) {
    agentKeys = [directKey];
  } else {
    process.stdout.write(
      `\n${COLORS.gray}Routing to the right expert(s)...${COLORS.reset} `
    );
    agentKeys = await routeTask(task);
    console.log(
      agentKeys
        .map((k) => `${AGENTS[k].emoji} ${AGENTS[k].name}`)
        .join(" + ")
    );
  }

  for (const key of agentKeys) {
    const agent = AGENTS[key];
    console.log(
      `\n${COLORS.cyan}${COLORS.bright}─── ${agent.emoji} ${agent.name} ───${COLORS.reset}\n`
    );
    await runAgent(key, task, (chunk) => process.stdout.write(chunk));
    console.log(`\n`);
  }
}

async function main() {
  printHeader();
  printAgentList();

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      `${COLORS.red}Error: ANTHROPIC_API_KEY environment variable is not set.${COLORS.reset}`
    );
    console.error(
      `${COLORS.gray}Set it with: export ANTHROPIC_API_KEY=your_key_here${COLORS.reset}\n`
    );
    process.exit(1);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => {
    rl.question(
      `${COLORS.green}${COLORS.bright}You → ${COLORS.reset}`,
      async (input) => {
        if (input.trim() === "/exit" || input.trim() === "exit") {
          console.log(`\n${COLORS.cyan}Goodbye! ∞${COLORS.reset}\n`);
          rl.close();
          process.exit(0);
        }

        try {
          await handleTask(input);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          console.error(`\n${COLORS.red}Error: ${message}${COLORS.reset}\n`);
        }

        prompt();
      }
    );
  };

  prompt();
}

main();
