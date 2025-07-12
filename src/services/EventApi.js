import axios from "axios";

export const createEventApi = async (data, token) => {
  return await axios.post(
    "https://event-management-lac-chi.vercel.app/api/v1/user/event",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
