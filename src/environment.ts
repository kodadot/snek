import { lookupArchive } from '@subsquid/archive-registry';

export const CHAIN = process.env.CHAIN || 'basilisk';
// Prod
const ARCHIVE_URL = lookupArchive('basilisk', { release: 'FireSquid' });
const NODE_URL = 'wss://rpc.basilisk.cloud';

// Rococo
const DEV_ARCHIVE_URL = 'https://basilisk-rococo-firesquid.play.hydration.cloud/graphql';
const DEV_NODE_URL = 'wss://basilisk-rococo-rpc.play.hydration.cloud';

export const isProd = CHAIN === 'basilisk';

export const getArchiveUrl = (): string => (isProd ? ARCHIVE_URL : DEV_ARCHIVE_URL);
export const getNodeUrl = (): string => (isProd ? NODE_URL : DEV_NODE_URL);
