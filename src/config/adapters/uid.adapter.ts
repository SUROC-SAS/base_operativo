import uid from 'uid-safe';

interface Uid {
  generate(length: number): string;
}

export class UidAdapter implements Uid {
  generate(length = 10) {
    return uid.sync(length);
  }
}