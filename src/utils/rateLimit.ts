import { RateLimiter } from "limiter";
import { Context } from 'hono';
import { defaultRateLimit, supabaseClient } from "../config";

const limiter = new RateLimiter({ tokensPerInterval: defaultRateLimit, interval: "day" });

export const rateLimit = async (c: Context, next: Function) => {
    try {
        const token = c.req.header("Authorization");
        const {data, error} = await supabaseClient
        .from('tokens')
        .select('role')
        .eq('token', token)

        if (error || data.length === 0 || !data) {
            return console.error('Error with rate limit', error);
        }
        const userRole = data[0].role;
        
        if (userRole === 'admin') {
            await next();
        }

        if (userRole === 'user') {
            const remainingRequests = await limiter.removeTokens(1);
            if (remainingRequests === 0) {
                return c.text('Rate limit exceeded', 429);
            }
            await next();
        }

        if (userRole === 'premium') {
            const remainingRequests = await limiter.removeTokens(0.5); // Reduce the limit by 50% for premium users.
            if (remainingRequests === 0) {
                return c.text('Rate limit exceeded', 429);
            }
        }
        await next();
        
    } catch (error) {
        return c.text('Error with rate limit', 500);
    }
}

export default rateLimit;
