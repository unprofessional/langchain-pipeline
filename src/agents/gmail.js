import ollama from 'ollama';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Define schema using Zod
const EmailDecision = z.object({
  action: z.enum(['spam', 'reply', 'important', 'ignore']),
  reason: z.string(),
});

const schema = zodToJsonSchema(EmailDecision);

// Send prompt with schema
const response = await ollama.chat({
  model: 'llama3',
  messages: [
    {
      role: 'user',
      content: `Decide how to handle this email:
Subject: "Your invoice is overdue"
Snippet: "Please settle your balance immediately."

Return a JSON object with "action" and "reason".`,
    },
  ],
  format: schema,
});

// Parse and validate output
const decision = EmailDecision.parse(JSON.parse(response.message.content));

console.log('🤖 Decision:', decision);
