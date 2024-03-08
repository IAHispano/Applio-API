import { supabaseClient } from "../config";

export const getEntriesEasyPaged = async (page: number, pageSize: number) => {
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const { data, error } = await supabaseClient
      .from("blog")
      .select("*")
      .range(startIndex, endIndex - 1);

    if (error) {
      console.error("Error getting paged data", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error getting paged data", error);
    return [];
  }
};
