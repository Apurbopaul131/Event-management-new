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
export const getMyEventsApi = async (token) => {
  return await axios.get(
    "https://event-management-lac-chi.vercel.app/api/v1/user/event/me",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getSpecificUserEvents = async () => {
  const response = await axios.get(
    "https://event-management-lac-chi.vercel.app/api/v1/user/event/me",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
export const deleteUserEvent = async (eventId) => {
  return await axios.delete(
    `https://event-management-lac-chi.vercel.app/api/v1/user/event/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
