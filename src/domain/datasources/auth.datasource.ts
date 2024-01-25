import { AuthDto } from "../dtos";

export abstract class AuthDataSource {
  abstract auth(authDto: AuthDto): Promise<string>;
}