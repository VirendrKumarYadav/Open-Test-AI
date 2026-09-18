import { env } from "../config/env.js";

export class OllamaClient {

  async chat(prompt: string): Promise<string> {

    const response = await fetch(
      `${env.ollamaBaseUrl}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.ollamaModel,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          stream: false,
          format: "json",
          options: {
            temperature: 0.8
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ollama request failed: ${response.status}`
      );
    }

    const data = await response.json();

    return data.message.content;
  }
}