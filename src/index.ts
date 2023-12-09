import { createClient } from '@supabase/supabase-js';
import express from 'express'
import modelsRouter from './routes/models'
import blogRouter from './routes/blog'
import userRouter from './routes/user'
const cors = require('cors');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

declare global {
  namespace Express {
    interface Request {
      apiKey: string; 
    }
  }
}


const app = express()
app.use(express.json(), cors());

const PORT = 6969

app.get('/ping', async (_req, res) => {
  const start = Date.now();

  await new Promise((resolve) => setTimeout(resolve, 100));

  const latency = Date.now() - start;

  console.log(`¡Pinged on ${new Date().toLocaleDateString()} with latency ${latency} ms!`);
  res.status(200).json({ latency: latency + 'ms' });
});

app.use('/key=:apiKey/models', async (req, res, next) => {
    const apiKey = req.params.apiKey;
  
    const { data: tokens, error } = await supabase
      .from('tokens')
      .select('token')
      .eq('token', apiKey);
  
    if (error) {
      res.status(500).json({ error: 'Bad API KEY' });
    } else if (tokens.length === 0) {
      res.status(401).json({ error: 'API KEY Not valid' });
    } else {
      req.apiKey = apiKey;
      next();
    }
  }, modelsRouter);

  app.use('/key=:apiKey/blog', async (req, res, next) => {
    const apiKey = req.params.apiKey;
  
    const { data: tokens, error } = await supabase
      .from('tokens')
      .select('token')
      .eq('token', apiKey);
  
    if (error) {
      res.status(500).json({ error: 'Bad API KEY' });
    } else if (tokens.length === 0) {
      res.status(401).json({ error: 'API KEY Not valid' });
    } else {
      req.apiKey = apiKey;
      next();
    }
  }, blogRouter);

  app.use('/key=:apiKey/user', async (req, res, next) => {
    const apiKey = req.params.apiKey;
  
    const { data: user, error } = await supabase
      .from('tokens')
      .select('role')
      .eq('token', apiKey);
  
    if (error) {
      res.status(500).json({ error: 'Bad API KEY' });
    } else if (user.length === 0) {
      res.status(401).json({ error: 'API KEY Not valid' });
    } else if (user[0].role !== 'admin') {
      res.status(403).json({ error: 'You need an API with permissions to perform this action' });
    } else {
      req.apiKey = apiKey;
      next();
    }
  }, userRouter);

  

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
