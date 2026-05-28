const BASE_URL = "http://localhost:5000/api";

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  return res.json();
};