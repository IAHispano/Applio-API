import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 h
  max: 50, // 50 request per 24 h
});




declare global {
    namespace Express {
      interface Request {
        apiKey: string;
      }
    }
  }

  async function AdminApiKeY(apikey: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('tokens') 
      .select('role')
      .eq('token', apikey);
  
    if (error) {
      console.error('Error verifying token', error);
      return false;
    }
  
    if (data && data.length > 0) {
      const rol = data[0].role;
  
      if (rol === 'admin') {
        return true;
      }
    }
  
    return false; 
  }
  

  const customLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const apikey = req.apiKey;
  
    if (apikey) {
      let isAdmin = false; 
  
      const isUserAdmin = await AdminApiKeY(apikey);
  
      if (isUserAdmin) {
        isAdmin = true; 
      }
  
      if (isAdmin) {
        next();
      } else {
        const { data: requestData, error: requestError } = await supabase
          .from('tokens')
          .select('usage')
          .eq('token', apikey);
  
        if (requestError) {
          console.error('Error with requests:', requestError);
        }
  
        const currentRequestCount = requestData ? requestData[0]?.usage || 0 : 0;
  
        const updatedCount = currentRequestCount + 1;
        const { error } = await supabase
          .from('tokens')
          .update({ usage: updatedCount })
          .eq('token', apikey);
  
        if (error) {
          console.error('Error at update logs;', error);
        }
  
        limiter(req, res, next);
      }
    } else {
      limiter(req, res, next);
    }
  };
  
  

export { limiter, customLimiter };
