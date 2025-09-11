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
  userInput: z.string().min(1, { message: "User input is required." }),
});

export const QuestionAndAnswerFormat = z.object({
  title: z.string(),
  description: z.string(),
});

export type QuestionType = z.infer<typeof QuestionAndAnswerFormat>;

export type ApiGetTitleType = {
  message: string;
  data: { data: QuestionType } | null;
  errors?: z.ZodFormattedError<{ userInput: string }, string>;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = RequestBodySchema.safeParse(body);

    if (!parseResult.success) {
      const errors = parseResult.error.format();
      return NextResponse.json<ApiGetTitleType>(
        { message: "Invalid request body.", data: null, errors },
        { status: 400 }
      );
    }

    const { userInput } = parseResult.data;

    const prompt = `Create a title for the following context that the user will give. 
    Write the title in less than 5 words. 
    Write a short description using less than 20 words.`;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: `You must create the title and description using this context: "${userInput}".`,
        },
      ],
      response_format: zodResponseFormat(QuestionAndAnswerFormat, "event"),
    });

    const event = completion.choices[0].message.parsed;

    if (event === null) {
      return NextResponse.json<ApiGetTitleType>(
        { message: "Event is null", data: null },
        { status: 400 }
      );
    }

    const response = {
      data: {
        title: event.title,
        description: event.description,
      },
    };

    return NextResponse.json<ApiGetTitleType>({
      message: "All good",
      data: response,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json<ApiGetTitleType>(
      { message: "Server error", data: null },
      { status: 500 }
    );
  }
}
