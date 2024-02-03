import { Hono } from "hono";
import fs from 'fs/promises';
import path from 'path';

const models = new Hono();

models.get("/", async (c: any) => {
  try {
    const modelsPath = path.join(__dirname, '..', '..', 'models');
    
    const pageParam = c.req.query('page');
    if (!pageParam) return c.text('Error: The parameter "page" is mandatory.', 400);

    const page = Math.max(0, parseInt(pageParam)) || 1;

    const pageSizeParam = c.req.query('max');
    if (!pageSizeParam) return c.text('Error: The parameter "max" (number of models) is mandatory.', 400);

    const pageSize = Math.min(40, Math.max(0, parseInt(pageSizeParam)));

    if (pageSize > 20) return c.text('Error: The value of "max" (number of models) is out of the allowed range (0-20).', 400);

    const files = await fs.readdir(modelsPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const limitedJsonFiles = jsonFiles.slice(startIndex, endIndex);

    const fileContents = await Promise.all(limitedJsonFiles.map(async (filename) => {
      const filePath = path.join(modelsPath, filename);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content); 
    }));

    return c.json(fileContents);
  } catch (error) {
    console.error(`Error reading files: ${error}`);
    return c.text('Error reading files', 500);
  }
});

export default models;
