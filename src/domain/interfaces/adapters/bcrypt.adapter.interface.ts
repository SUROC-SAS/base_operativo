export interface UbcryptAdapter {
  encrypt(value: string, length: number): string;
  compare(passDto: string, passDb: string): Promise<boolean>;
}