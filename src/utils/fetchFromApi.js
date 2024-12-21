let baseUrl = "http://localhost:5000";

async function fetchFromApi(path) {
  try {
    // Ensure the path is correctly formatted
    if (!path.startsWith('api/')) {
      path = `api/${path}`;
    }

    const res = await fetch(`${baseUrl}/${path}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export default fetchFromApi;
