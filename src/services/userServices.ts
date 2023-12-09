import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getEntriesEasyPaged = async (page: number, pageSize: number) => {
    try {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
  
      const { data, error } = await supabase
        .from('profiles') 
        .select('*')
        .range(startIndex, endIndex - 1); 
  
      if (error) {
        console.error('Error getting paged data', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Error getting paged data', error);
      return [];
    }
  }