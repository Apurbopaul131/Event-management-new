import axios from "axios";

export const userLoginApi = async (data) => {
  return await axios.post(
    "https://event-management-lac-chi.vercel.app/api/v1/auth/login",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const userRegistrationApi = async (data) => {
  return await axios.post(
    "https://event-management-lac-chi.vercel.app/api/v1/auth/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
