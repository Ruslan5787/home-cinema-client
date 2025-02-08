export function getTokenFromLocalStorage(): string {
  const data = localStorage.getItem('token');

  const token: string = data ? JSON.parse(data) : '';

  return token;
}

export function setTokenToLocalStorage(token: string): void {
  localStorage.setItem('token', JSON.stringify(token));
}

export function removeTokenFromLocalStorage(): void {
  localStorage.removeItem('token');
}
