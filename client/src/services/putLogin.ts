import type { ILoginData } from "../Interfaces";

export const putLogin = async (loginData: ILoginData) => {
  const response = await fetch("/api/auth/login", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  const data = await response.json();
  return data.token
};
