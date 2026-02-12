const BASE_URL = "https://api.spaceflightnewsapi.net/v4/blogs";

export async function getPaginatedBlogs(page = 1, limit = 9) {
  const offset = (page - 1) * limit;

  const res = await fetch(`${BASE_URL}/?limit=${limit}&offset=${offset}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  return {
    blogs: data.results,
    totalPages: Math.ceil(data.count / limit),
  };
}

export async function getBlogById(id) {
  const res = await fetch(`${BASE_URL}/${id}/`, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
