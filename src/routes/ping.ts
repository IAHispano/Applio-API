import { Hono } from "hono";
 
const ping = new Hono()

ping.get('/', async (context) => {
    const startTime = process.hrtime();
    context.status(200)
    const elapsed = process.hrtime(startTime);
    const latency = (elapsed[0] * 1e9 + elapsed[1]) / 1e6;
    return context.json({ latency: `${latency}ms` });
  });

export default ping