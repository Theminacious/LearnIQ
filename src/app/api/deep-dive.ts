import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export const maxDuration = 20;
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const RequestBodySchema = z.object({
  question: z.string().min(1, { message: "User input is required." }),
});

export const DeepDiveFormat = z.object({
  markdown: z.string(),
});

export type DeepDiveType = z.infer<typeof DeepDiveFormat>;

export type ApiDeepDiveResponse = {
  message: string;
  data: DeepDiveType | null;
  errors?: z.ZodFormattedError<
    {
      userInput: string;
    },
    string
  >;
};

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const parseResult = RequestBodySchema.safeParse(body);

    if (!parseResult.success) {
      const errors = parseResult.error.format();

      return NextResponse.json<ApiDeepDiveResponse>(
        {
          message: "Invalid request body.",
          data: null,
          errors,
        },
        { status: 400 }
      );
    }

    const { question } = parseResult.data;

    const prompt = `
    You are a teacher providing a deep dive explanation for a student. 
    The response must be in markdown format with the following requirements:
    1. Use clearly defined sections with appropriate headings (e.g., # Topic, ## Subtopic).
    2. Use code blocks (e.g., \`\`\`) to provide code examples where necessary.
    3. Use diagrams (in mermaid.js syntax) to explain concepts visually, but ensure they are simple and syntactically correct. 
       - Preferred diagram types: flowcharts, sequence diagrams, and class diagrams.
       - Avoid overly complex diagrams or incorrect syntax.
    4. Be concise and to the point; avoid filler text or unnecessary explanations.
    5. Structure the output so it is easy to follow and logically organized.
    `;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `The context is: "${question}".`,
        },
      ],
      response_format: zodResponseFormat(DeepDiveFormat, "event"),
    });

    const event = completion.choices[0].message.parsed;

    return NextResponse.json<ApiDeepDiveResponse>({
      message: "All good",
      data: event,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json<ApiDeepDiveResponse>(
      { message: "Server error", data: null },
      { status: 500 }
    );
  }
}
