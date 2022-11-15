import * as ss58 from '@subsquid/ss58';
import { decodeHex } from '@subsquid/substrate-processor';
import { SomethingWithOptionalMeta } from './types';

export function isEmpty(obj: Record<string, unknown>): boolean {
  // eslint-disable-next-line guard-for-in, @typescript-eslint/naming-convention
  for (const _ in obj) { return false; }
  return true;
}

export function addressOf(address: Uint8Array | string): string {
  const value = typeof address === 'string' ? decodeHex(address) : address;
  if (!value) {
    return '';
  }
  return ss58.codec('basilisk').encode(value);
}

export function camelCase(str: string): string {
  return str.replace(/([_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''));
}

export function metadataOf({ metadata }: SomethingWithOptionalMeta): string {
  return metadata ?? '';
}

export function oneOf<T>(one: T, two: T): T {
  return one || two;
}

export function toPercent(value: number): number {
  return value / 100;
}
