export function authHeader() {
  const token = localStorage.getItem("saep_token");

  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}
