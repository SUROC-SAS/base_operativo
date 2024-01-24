import { User } from "../user/user";

export interface UjwtAdapter {
  generate(user: User): string;
}