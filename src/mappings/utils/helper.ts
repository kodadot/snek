import * as ss58 from '@subsquid/ss58';
import { decodeHex } from '@subsquid/substrate-processor';
import { SomethingWithOptionalMeta } from './types';

export function isEmpty(obj: Record<string, any>) {
  for (const _ in obj) { return false; }
  return true;
}

export function addressOf(address: Uint8Array | string): string {
  const value = typeof address === 'string' ? decodeHex(address) : address;
  return ss58.codec('basilisk').encode(value);
}

export function metadataOf({ metadata }: SomethingWithOptionalMeta): string {
  return metadata ?? '';
}
