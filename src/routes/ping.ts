import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";

const ping = new Hono();

ping.get("/", async (context) => {
  try {
    const startTime = process.hrtime();
    context.status(200);
    const elapsed = process.hrtime(startTime);
    const latency = (elapsed[0] * 1e9 + elapsed[1]) / 1e6;
    return context.json({ latency: `${latency}ms` });
  } catch (error) {
    ping.onError(errorHandler);
  }
});

export default ping;
