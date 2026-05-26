import Anthropic from "@anthropic-ai/sdk";
import { productAgent } from "./agents/product.js";
import { frontendAgent } from "./agents/frontend.js";
import { backendAgent } from "./agents/backend.js";
import { qaAgent } from "./agents/qa.js";
import { researcherAgent } from "./agents/researcher.js";
import { securityAgent } from "./agents/security.js";
import { psychologistAgent } from "./agents/psychologist.js";
import { copywriterAgent } from "./agents/copywriter.js";
import { marketingAgent } from "./agents/marketing.js";
import { seoAgent } from "./agents/seo.js";
import { wordpressAgent } from "./agents/wordpress.js";
import { growthAgent } from "./agents/growth.js";
import { ceoAgent } from "./agents/ceo.js";
import { investorAgent } from "./agents/investor.js";
import { usersAgent } from "./agents/users.js";
import { uxuiAgent } from "./agents/uxui.js";

export const AGENTS = {
  ceo: ceoAgent,
  uxui: uxuiAgent,
  product: productAgent,
  frontend: frontendAgent,
  backend: backendAgent,
  qa: qaAgent,
  researcher: researcherAgent,
  security: securityAgent,
  psychologist: psychologistAgent,
  copywriter: copywriterAgent,
  marketing: marketingAgent,
  seo: seoAgent,
  wordpress: wordpressAgent,
  growth: growthAgent,
  investor: investorAgent,
  users: usersAgent,
};

export type AgentKey = keyof typeof AGENTS;

const client = new Anthropic();

const ROUTER_PROMPT = `You are the task router for the PlanAfter agent team. Given a task, decide which agent(s) should handle it.

Available agents:
- ceo: Strategic decisions, vision, priorities, founder perspective
- uxui: World-class UX/UI design, global best practices, accessibility, design systems, usability audits
- product: Feature specs, user stories, roadmap, prioritization
- frontend: React/TypeScript UI, component architecture, Figma-to-code
- backend: NestJS API, Prisma/PostgreSQL, auth, security
- qa: Testing strategy, bug analysis, edge cases
- researcher: Competitor analysis, legal/regulatory requirements, certifications
- security: Security auditing, GDPR, encryption, threat modeling
- psychologist: Grief-informed UX, empathetic design, user psychology
- copywriter: UI copy, landing pages, emails, product messaging
- marketing: Go-to-market strategy, campaigns, social media
- seo: Keyword research, technical SEO, content optimization
- wordpress: WordPress marketing site, landing pages, blog
- growth: SaaS metrics, pricing, conversion optimization, retention
- investor: VC/board perspective, fundraising, unit economics, due diligence
- users: Simulated user testing — 3 real user personas give honest feedback

Respond with a JSON array of agent keys (1-3 max). Example: ["product", "backend"]
Only respond with the JSON array, nothing else.`;

export async function routeTask(task: string): Promise<AgentKey[]> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: `Task: ${task}`,
      },
    ],
    system: ROUTER_PROMPT,
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "[]";
  try {
    const keys = JSON.parse(text) as AgentKey[];
    return keys.filter((k) => k in AGENTS);
  } catch {
    return ["product"];
  }
}

export async function runAgent(
  agentKey: AgentKey,
  task: string,
  onChunk?: (text: string) => void
): Promise<string> {
  const agent = AGENTS[agentKey];
  let fullResponse = "";

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: agent.systemPrompt,
    messages: [{ role: "user", content: task }],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      fullResponse += chunk.delta.text;
      if (onChunk) onChunk(chunk.delta.text);
    }
  }

  return fullResponse;
}
