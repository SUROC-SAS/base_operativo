export interface JWTAdapter {
  verify(token: string): Record<string, unknown>;
  generate(user: Record<string, unknown>, duration?: string): string;
}
