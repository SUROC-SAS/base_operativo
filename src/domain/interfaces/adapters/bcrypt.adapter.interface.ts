export interface UbcryptAdapter {
  encrypt(value: string, length: number): string;
  compare(passDb: string, passDto: string): Promise<boolean>;
}