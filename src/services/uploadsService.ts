import { supabaseClient } from "../config";

export const uploadModel = async (
  id: any,
  name: any,
  link: any,
  image_url: any,
  type: any,
  epochs: number,
  created_at: any,
  algorithm: any,
  author_id: any,
  author_username: any,
) => {
  try {
    const { data, error } = await supabaseClient.from("models").insert([
      {
        id: id,
        name: name,
        link: link,
        image_url: image_url,
        type: type,
        epochs: epochs,
        created_at: created_at,
        algorithm: algorithm,
        author_id: author_id,
        author_username: author_username,
      },
    ]);

    if (error) {
      console.error("Error when uploading model", error);
      return [];
    }

    return { success: true, message: "Data uploaded correctly" };
  } catch (error) {
    console.error("Error when uploading model", error);
    return [];
  }
};
