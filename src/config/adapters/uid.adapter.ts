import uid from 'uid-safe';
import { UuidAdapter } from '#/domain/interfaces/adapters/uuid.adapter.interface';
export class UidAdapter implements UuidAdapter {
  generate(length = 10) {
    return uid.sync(length);
  }
}