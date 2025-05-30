import express from "express";
import { runSchema } from "../validation/schema";
import redis from "../lib/redis"; // default import
import { supabase } from "../lib/supabase";
import { getGeminiResponse } from "../lib/gemini";
import { performWebSearch } from "../lib/webSearch";

export const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const parsed = runSchema.parse(req.body);
    const { prompt, tool } = parsed;

    let answer: string = "";

    if (tool === "calculator") {
      // Safe eval: remove any unsafe characters
      answer = eval(prompt.replace(/[^-()\d/*+.]/g, "")).toString();
    } else if (tool === "web-search") {
      // Stub: in real case, you'd fetch from a search API
      answer = await performWebSearch(prompt)
      console.log( "answer : ", answer)
    }

    const finalPrompt =
      tool === "calculator"
        ? `The answer to the calculation "${prompt}" is ${answer}.`
        : `Based on a web search for "${prompt}", here's what I found: ${answer}`;

    const response = await getGeminiResponse(finalPrompt);

    // Save to Supabase
    await supabase.from("runs").insert([
      {
        prompt,
        tool,
        response,
        llm_tokens: response.length,
        created_at: new Date().toISOString(),
      },
    ]);

    // Save to Redis (for user "anon")
    const cacheKey = `user:anon:runs`;
    const entry = {
      prompt,
      tool,
      response,
      created_at: Date.now(),
    };
    await redis.lpush(cacheKey, JSON.stringify(entry));
    await redis.ltrim(cacheKey, 0, 9); // Keep last 10 only

    res.setHeader("Content-Type", "text/plain");
    res.write(response);
    res.end();
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Optional: Endpoint to get recent runs from Redis
router.get("/recent", async (_req, res) => {
  try {
    const cacheKey = `user:anon:runs`;
    const cached = await redis.lrange(cacheKey, 0, 9);
    const runs = cached.map((entry) => JSON.parse(entry));
    res.json({ runs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
