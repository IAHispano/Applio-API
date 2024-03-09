import { RateLimiter } from "limiter";
import { Context } from 'hono';
import { defaultRateLimit, premiumRateLimit } from "../config";

let limiter: RateLimiter;
let tokensPerInterval: number;

const setupRateLimiter = (role: string) => {
    tokensPerInterval = role === 'premium' ? premiumRateLimit : defaultRateLimit;
    limiter = new RateLimiter({ tokensPerInterval, interval: "day" });
}

export const rateLimit = async (c: Context, next: Function) => {
    if (c.get('role') !== 'admin') {
        setupRateLimiter(c.get('role'));
        const remainingRequests = await limiter.removeTokens(1);
        console.log(remainingRequests);

            if (remainingRequests === 0 || remainingRequests < 0) {
                return c.text("Rate limit exceeded", 429);
            }
    }
    
    await next();
}

export default rateLimit;