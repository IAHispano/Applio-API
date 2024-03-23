import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { getBlogs, getBlogsByTitle } from "../services/blogsService";
import { maxPerPage, minPage } from "../config";

const blogs = new Hono();

blogs.get("/", async (c) => {
  try {
    const title = c.req.header("title");
    const page = Number(c.req.header("page")) || minPage;
    const pageSize = Number(c.req.header("perPage")) || maxPerPage;

    if (title) {
      const data = await getBlogsByTitle(title);
      if (data.length === 0) {
        return c.json({ message: "No results found." });
      }
      return c.json(data);
    }

    if (!title) {
      const data = await getBlogs(page, pageSize);
      if (data.length === 0) {
        return c.json({ message: "No results found." });
      }
      return c.json(data);
    }
  } catch (error) {
    return errorHandler(c, error);
  }
});

export default blogs;
