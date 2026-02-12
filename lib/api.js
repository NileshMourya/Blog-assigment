const BASE_URL = "https://jsonfakery.com/blogs";

export async function getPaginatedBlogs(page = 1) {
  try {
    const res = await fetch(`${BASE_URL}/paginated?page=${page}`, {
      cache: "no-store",
    });

    console.log("Status:", res.status);

    const text = await res.text();
    console.log("Raw response:", text);

    return JSON.parse(text);
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}
