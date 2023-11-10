import express from "express";
import { findByName, getEntriesEasyPaged, findByUsername, getEntriesFilteredByType, findByUsernameAndType } from "../services/modelsServices";
import { customLimiter } from '../rate-limit';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/perpage=:perpage/page=:page', async (req, res) => {
  const page = parseInt(req.params.page); 
  let pageSize = parseInt(req.params.perpage);
  const type = req.query.type as string;

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

      if (type) {
        entries = await getEntriesFilteredByType(page, pageSize, type);
      } else {
        entries = await getEntriesEasyPaged(page, pageSize);
      }

      res.json(entries);
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting user role from the database" });
  }
});




router.get('/', (_req, res) => {
  res.send('You must limit the number of models received.');
});

router.get('/search', customLimiter, async (req, res) => {
  const name = req.query.name as string;

  try {
    if (name && name.length >= 3) {
      const entriesByName = await findByName(name);

      if (req.query.type) {
        const type = req.query.type as string;
        const filteredEntries = entriesByName.filter(entry => entry.type.toLowerCase() === type.toLowerCase());

        if (filteredEntries && filteredEntries.length > 0) {
          res.json(filteredEntries);
        } else {
          res.sendStatus(404);
        }
      } else {
        if (entriesByName && entriesByName.length > 0) {
          res.json(entriesByName);
        } else {
          res.sendStatus(404);
        }
      }
    } else {
      res.status(400).json({ error: "Name must have at least 3 letters." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error when searching" });
  }
});


router.get('/user=:username', customLimiter, async (req, res) => {
  const username = req.params.username as string;
  const typeFilter = req.query.type; 

  try {
    if (username && username.length >= 3) {
      let entries;

      if (typeFilter) {
        entries = await findByUsernameAndType(username, typeFilter as string);
      } else {
        entries = await findByUsername(username);
      }

      if (entries && entries.length > 0) {
        res.json(entries);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.status(400).json({ error: "Username must have at least 3 letters." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error when searching" });
  }
});






export default router;
