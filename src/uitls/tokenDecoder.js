import { jwtDecode } from "jwt-decode";
export const jwtTokenDecoder = (token) => {
  return jwtDecode(token);
};
