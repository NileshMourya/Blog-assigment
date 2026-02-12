const BASE_URL = "https://jsonfakery.com/blogs";

export async function getPaginatedBlogs(page = 1) {
  const res = await fetch(`${BASE_URL}/paginated?page=${page}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  return data;
}
