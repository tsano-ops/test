import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type ChatMessage = {
  role: string;
  content: string;
  timestamp: string;
  [key: string]: unknown;
};

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistory(userId: string) {
    const conversations = await this.prisma.aiConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    });
    return conversations.map((c) => ({
      id: c.id,
      messages: c.messages as unknown as ChatMessage[],
      context: c.context,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  async sendMessage(userId: string, message: string, context?: string) {
    // Find or create a conversation for this context
    let conversation = await this.prisma.aiConversation.findFirst({
      where: { userId, context: context ?? null },
      orderBy: { updatedAt: 'desc' },
    });

    const userMsg: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    const responseText = this.generateResponse(message);
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: responseText,
      timestamp: new Date().toISOString(),
    };

    if (conversation) {
      const existingMessages = (conversation.messages as unknown as ChatMessage[]) || [];
      conversation = await this.prisma.aiConversation.update({
        where: { id: conversation.id },
        data: {
          messages: [...existingMessages, userMsg, assistantMsg] as any,
        },
      });
    } else {
      conversation = await this.prisma.aiConversation.create({
        data: {
          userId,
          messages: [userMsg, assistantMsg] as any,
          context: context ?? null,
        },
      });
    }

    return {
      conversationId: conversation.id,
      response: responseText,
    };
  }

  async clearHistory(userId: string) {
    const result = await this.prisma.aiConversation.deleteMany({
      where: { userId },
    });
    return { deleted: result.count };
  }

  private generateResponse(message: string): string {
    const lower = message.toLowerCase();

    if (/asset|money|bank|property|account|savings|investment/.test(lower)) {
      return 'You can organize all your financial assets in the Assets section of PlanAfter. This includes bank accounts, investments, real estate, and digital assets. Each entry can be linked to documents in your Vault and shared with your executor when the time comes.';
    }

    if (/will|legal|executor|power of attorney|trust/.test(lower)) {
      return 'The Legal Documents section is where you can store and manage your will, power of attorney, trusts, and other legal instruments. You can upload copies to the Vault and assign an executor who will have access when needed.';
    }

    if (/health|emergency|medical|doctor|hospital|allergy/.test(lower)) {
      return 'Your Health section lets you record medical conditions, allergies, medications, and emergency contacts. This information can be critical for your family in an emergency. Keep it updated so your trusted people always have what they need.';
    }

    if (/family|children|spouse|parent|sibling|partner/.test(lower)) {
      return 'The Family section helps you map out your family tree and relationships. You can add contact information for each family member and define their role in your plan, whether as executor, beneficiary, or contributor.';
    }

    if (/task|reminder|todo|to-do|checklist/.test(lower)) {
      return 'Tasks and reminders help you stay on track with your planning. You can create to-dos for each area of your plan, set due dates, and mark priorities. PlanAfter can also suggest smart tasks based on what you have completed so far.';
    }

    if (/help|how|what|where|guide|start|getting started/.test(lower)) {
      return 'PlanAfter helps you organize your life plan across several areas: Assets and Liabilities, Legal Documents, Family and Relationships, Health Records, Legacy Letters, and a secure Vault for your files. You can share parts of your plan with trusted people and set up tasks to keep everything current. Where would you like to start?';
    }

    return "I'm your PlanAfter assistant. I can help you organize your life plan, manage assets, set up legal documents, and more. What would you like to know?";
  }
}
