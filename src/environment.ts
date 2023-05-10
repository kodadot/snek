const VERSION = process.env.VERSION || '004';
// Prod
const ARCHIVE_URL = 'https://basilisk-firesquid.play.hydration.cloud/graphql';
const NODE_URL = 'wss://rpc.basilisk.cloud';

// Rococo
const DEV_ARCHIVE_URL = 'https://basilisk-rococo-firesquid.play.hydration.cloud/graphql';
const DEV_NODE_URL = 'wss://basilisk-rococo-rpc.play.hydration.cloud';

const isProd = Number(VERSION) >= 5;

export const getArchiveUrl = (): string => (isProd ? ARCHIVE_URL : DEV_ARCHIVE_URL);
export const getNodeUrl = (): string => (isProd ? NODE_URL : DEV_NODE_URL);
