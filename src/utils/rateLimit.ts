import { RateLimiter } from "limiter";
import { Context } from "hono";

const limiter = new RateLimiter({ tokensPerInterval: 150, interval: "day" });

export const rateLimit = async (c: Context, next: Function) => {
  try {
    const remainingRequests = await limiter.removeTokens(1);
    if (remainingRequests === 0) {
      return c.text("Rate limit exceeded", 429);
    }
    await next();
  } catch (error) {
    return c.text("Error with rate limit", 500);
  }
};

export default rateLimit;
