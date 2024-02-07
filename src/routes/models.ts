import { Hono } from "hono";
import fs from 'fs/promises';
import path from 'path';

const models = new Hono();

async function getContents(dirPath: string): Promise<any[]> {
  const items = await fs.readdir(dirPath);
  const contents: any[] = [];

  await Promise.all(items.map(async (itemName) => {
    const itemPath = path.join(dirPath, itemName);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      contents.push({
        name: itemName,
        content: await getContents(itemPath),
      });
    } else {
      const fileExtension = path.extname(itemName).toLowerCase();
      if (fileExtension !== '.pth' && fileExtension !== '.index') {
        const parsedContent = await parseJSONFile(itemPath);
        contents.push({
          json: parsedContent,
        });
      } else {
        contents.push({
          file: fileExtension,
          path: itemPath,
        });
      }
    }
  }));

  if (contents.length === 0) {
    return [{ error: "No model found" }]; 
  }
  
  return contents || 'No model found.';

}

async function parseJSONFile(filePath: string): Promise<any> {
  const content = await fs.readFile(filePath, 'utf-8');
  const parsedContent = JSON.parse(content);
  delete parsedContent.image_url;
  delete parsedContent.link;
  return parsedContent;
}

models.get("/", async (c: any) => {
  try {
    const modelsPath = path.join(__dirname, '..', '..', 'models');
    const pageParam = c.req.query('page');
    const pageSizeParam = c.req.query('max');
    const searchParam = c.req.query('search');
    
    if (!pageParam || !pageSizeParam) {
      return c.text('Error: The parameters "page" and "max" are mandatory.', 400);
    }
    
    const page = Math.max(1, parseInt(pageParam));
    const pageSize = Math.min(20, Math.max(0, parseInt(pageSizeParam)));
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    let contents = await getContents(modelsPath);
    
    if (searchParam) {
      contents = filterContentsBySearch(contents, searchParam);
    }
    
    contents.sort((a, b) => compareCreatedAt(a, b));
    
    const paginatedContents = contents.slice(startIndex, endIndex);
    
    return c.json(paginatedContents);
  } catch (error) {
    console.error(`Error reading files: ${error}`);
    return c.text('Error reading files', 500);
  }
});

function filterContentsBySearch(contents: any[], searchParam: string): any[] {
  const filteredContents = contents.filter((item) => {
    if (item.content && Array.isArray(item.content) && item.content.length > 0) {
      const modelInfo = item.content.find((contentItem: any) => contentItem.json && contentItem.json.name);
      return modelInfo?.json?.name?.toLowerCase().includes(searchParam.toLowerCase());
    }
    return false; 
  });

  if (filteredContents.length === 0) {
    return [{ error: "No model found" }]; 
  }

  return filteredContents;
}


function compareCreatedAt(a: any, b: any): number {
  const createdAtA = (a.content.find((contentItem: any) => contentItem.json && contentItem.json.created_at)?.json?.created_at) || 0;
  const createdAtB = (b.content.find((contentItem: any) => contentItem.json && contentItem.json.created_at)?.json?.created_at) || 0;
  return new Date(createdAtB).getTime() - new Date(createdAtA).getTime();
}

export default models;
