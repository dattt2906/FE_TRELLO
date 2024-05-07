import api from "./api";

export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login",  { email, password });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
