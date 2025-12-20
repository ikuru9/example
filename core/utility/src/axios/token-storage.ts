export interface TokenStorage {
  setAccessToken(value: string, expires: number): void;
  getAccessToken(): string | undefined;
  removeAccessToken(): void;
  setRefreshToken(value: string, expires: number): void;
  getRefreshToken(): string | undefined;
  removeRefreshToken(): void;
}
