// routeFiles.ts
import * as fs from "fs";
import * as path from "path";

export const getRouteFiles = (routesDir: string): string[] => {
  const files = fs.readdirSync(routesDir);
  return files.map((file) => "/" + path.parse(file).name);
};
