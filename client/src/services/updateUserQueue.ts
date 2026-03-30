import Auth from "../utils/auth";

export const updateUserQueue = async (queue: number[]) => {
  const user = await Auth.getUser();
  const response = await fetch(`/api/users/${user?.username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user, queue }),
  });
  const data = await response.json();
  return data
};
