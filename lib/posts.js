import { supabase } from "./supabase";

export async function createPost({ title, content, category, userId }) {
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        content,
        category,
        user_id: userId,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users:user_id(name, avatar_url)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getPosts({ category, page = 1, limit = 10 }) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const query = supabase
    .from("posts")
    .select("*, users:user_id(name, avatar_url)", { count: "exact" });

  if (category) {
    query.eq("category", category);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { posts: data, total: count };
}

export async function updatePost({ id, title, content, category }) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}
