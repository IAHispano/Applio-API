import { Hono } from "hono";
import { errorHandler } from "../utils/error/errorHandler";
import { uploadModel } from "../services/uploadsService";

const upload = new Hono();

upload.post("/", async (c) => {
  try {
    const id = c.req.header("id");
    const name = c.req.header("name");
    const link = c.req.header("link");
    const image_url = c.req.header("image");
    const type = c.req.header("type");
    const epochs = Number(c.req.header("epochs"));
    const created_at = c.req.header("createdAt");
    const algorithm = c.req.header("algorithm");
    const author_id = c.req.header("authorId");
    const author_username = c.req.header("authorUsername");
    
    if (!id || !name || !link || !image_url || !type || !epochs || !created_at || !algorithm || !author_id || !author_username) {
      return c.text("You must enter all parameters via header, see https://applio.org/api/docs for more information.", 400);
    } else {
        const data = await uploadModel(id, name, link, image_url, type, epochs, created_at, algorithm, author_id, author_username);
        return c.json(data);
    }

  } catch (error) {
    upload.onError(errorHandler);
  }
});

export default upload;
