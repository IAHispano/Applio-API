import express from "express";
import { customLimiter } from '../rate-limit';
import { createClient } from '@supabase/supabase-js';
import { getEntriesEasyPaged } from "../services/userServices";

const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/', (_req, res) => {
  res.send('You must limit the number of users received.');
});

router.get('/perpage=:perpage/page=:page', customLimiter, async (req, res) => {
    const page = parseInt(req.params.page);
    let pageSize = parseInt(req.params.perpage);
  
    try {
      const { data: user } = await supabase
        .from('tokens')
        .select('role')
        .eq('token', req.apiKey);
  
      const isAdmin = user && user.length > 0 && user[0].role === 'admin';

      if (!isAdmin && (isNaN(pageSize) || pageSize <= 0 || pageSize > 25 || isNaN(page) || page <= 0)) {
        res.status(400).json({ error: "Invalid or exceeding perpage limit (max 25)." });
      } else {
        let entries;
  
        entries = await getEntriesEasyPaged(page, pageSize);
  
        res.json(entries);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting user role from the database" });
    }
  });

export default router;
