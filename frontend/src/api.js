const BASE_URL = "/api";

// GET all users from backend
export const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};