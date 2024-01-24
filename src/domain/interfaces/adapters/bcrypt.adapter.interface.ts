export interface UbcryptAdapter {
  encrypt(value: string, length: number): string;
}