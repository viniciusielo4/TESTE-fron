export function authHeader() {
  const token = localStorage.getItem('saep_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}
