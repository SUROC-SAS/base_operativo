export interface JWTAdapter {
  generate(user: Record<string, unknown>, duration?: string): string;
}
