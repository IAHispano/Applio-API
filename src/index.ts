import { createClient } from '@supabase/supabase-js';
import express from 'express'
import modelsRouter from './routes/models'
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

const logRecords = [];
const morgan = require('morgan');
morgan.token('clientip', function (req: { ip: any; }) {
  return req.ip;
});

morgan.format('mydate', function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});

morgan.format('myip', function (req: { ip: any; }) {
  const clientIP = req.ip;
  const ipv4 = clientIP.replace('::ffff:', ''); // Extrae la dirección IPv4
  return ipv4;
});

const logFormat = '[:mydate] IP: :myip METHOD: :method URL: :url STATUS: :status TIME: :response-time ms';

const app = express()
app.use(express.json(), cors(), morgan(logFormat, {
  stream: {
    write: (message: string) => {
      const logData = parseLogData(message);
      logRecords.push(logData);
      sendLogs(logData); 
    },
  },
}));

function parseLogData(logMessage: string) {
  const ipMatch = logMessage.match(/IP: ([^ ]+)/);
  const methodMatch = logMessage.match(/METHOD: ([^ ]+)/);
  const urlMatch = logMessage.match(/URL: ([^ ]+)/);
  const statusMatch = logMessage.match(/STATUS: ([^ ]+)/);
  const timeMatch = logMessage.match(/TIME: ([^ ]+) ms/);
  const mydateMatch = logMessage.match(/\[(.*?)\]/);

  if (ipMatch && methodMatch && urlMatch && statusMatch && timeMatch && mydateMatch) {
    const logData = {
      ip: ipMatch[1],
      method: methodMatch[1],
      url: urlMatch[1],
      status: statusMatch[1],
      time: timeMatch[1],
      mydate: mydateMatch[1],
    };
    return logData;
  }
  return null;
}

async function sendLogs(logData: any) {
  if (logData) {
    const { error } = await supabase.from('logs').upsert(logData);
    if (error) {
      console.error('Error al enviar los registros de logs a Supabase:', error);
    } else {
    }
  }
}

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.post('/key=:apiKey/generateToken', async (req, res) => {
  const apiKey  = req.params.apiKey; 

  const { data: user, error } = await supabase
    .from('tokens')
    .select('role')
    .eq('token', apiKey);

  if (error) {
    res.status(500).json({ error: 'API KEY Not valid' });
  } else if (user.length === 0) {
    res.status(401).json({ error: 'User not valid' });
  } else if (user[0].role !== 'admin') {
    res.status(403).json({ error: 'You need an API with permissions to perform this action' });
  } else {
    const { data: newTokenData, error } = await supabase
      .from('tokens')
      .upsert([{}])
      .select('token');

    if (error) {
      res.status(500).json({ error: 'Error saving token in database' });
    } else {
      res.status(201).json({ message: 'Token generated successfully', token: newTokenData });
    }
  }
});
