/*
  OpenAI client setup using the official OpenAI SDK.
  Configured to use the API key from environment variables.
*/

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
