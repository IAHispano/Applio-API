import { supabaseClient, maxPerPage, minPage } from "../config";

export const findByName = async (searchTerm: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("models")
      .select("*")
      .filter("name", "ilike", `${searchTerm}%`);

    if (error) {
      console.error("Error when searching by name", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error when searching by name", error);
    return [];
  }
};

export const findByType = async (searchType: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("models")
      .select("*")
      .ilike("type", `%${searchType}%`);

    if (error) {
      console.error("Error when searching by type", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error when searching by type", error);
    return [];
  }
};

export const findByUsername = async (searchTerm: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("models")
      .select("*")
      .filter("author_username", "ilike", `${searchTerm}%`);

    if (error) {
      console.error("Error when searching by username", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error when searching by username", error);
    return [];
  }
};

export const getEntriesEasyPaged = async (
  page: number = 1,
  pageSize: number = maxPerPage,
) => {
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const { data, error } = await supabaseClient
      .from("models")
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

export const getEntriesFilteredByType = async (
  page: number = minPage,
  pageSize: number = maxPerPage,
  type: string,
) => {
  try {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const { data, error } = await supabaseClient
      .from("models")
      .select("*")
      .filter("type", "ilike", `%${type}%`)
      .range(startIndex, endIndex - 1);

    if (error) {
      console.error("Error getting filtered data by type", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error getting filtered data by type", error);
    return [];
  }
};
export const findByUsernameAndType = async (
  searchUsername: string,
  searchType: string,
) => {
  try {
    const { data, error } = await supabaseClient
      .from("models")
      .select("*")
      .filter("author_username", "ilike", `${searchUsername}%`)
      .filter("type", "ilike", `%${searchType}%`);

    if (error) {
      console.error("Error when searching by username and type", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error when searching by username and type", error);
    return [];
  }
};
