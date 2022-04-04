import * as ss58 from "@subsquid/ss58";

export function isEmpty(obj: Record<string, any>) {
  for (const _ in obj) { return false; }
  return true;
}

export function addressOf(address: Uint8Array) {
 return ss58.codec("basilisk").encode(address);
}