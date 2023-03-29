import { NextResponse } from 'next/server';
import {Configuration, OpenAIApi} from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);


export async function POST(request: Request) {
  const res = await request.json();
  const response = await openai.createChatCompletion({
    model: "gpt-4-0314",
    messages: [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": res.userChat},
    ]
  });
  return new NextResponse(response.data.choices[0].message?.content);
}
