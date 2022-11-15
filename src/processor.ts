import {
  SubstrateProcessor,
} from '@subsquid/substrate-processor';
import { FullTypeormDatabase as Database } from '@subsquid/typeorm-store';
import 'dotenv/config';
import { getArchiveUrl, getNodeUrl } from './environment';
import * as mappings from './mappings';
import * as assetMappings from './mappings/assetRegistry';
import logger from './mappings/utils/logger';
import { Event } from './processable';

const database = new Database();
const processor = new SubstrateProcessor(database);

const STARTING_BLOCK = 6000; // 6000 or 1790000 for Prod

processor.setTypesBundle('basilisk');
processor.setBatchSize(50);
processor.setBlockRange({ from: STARTING_BLOCK });

// Prod
const ARCHIVE_URL = getArchiveUrl();
const NODE_URL = getNodeUrl();

// Rococo
// const ARCHIVE_URL = 'https://basilisk-rococo-firesquid.play.hydration.cloud/graphql';
// const NODE_URL = 'wss://rococo-basilisk-rpc.hydration.dev';

const archive = process.env.ARCHIVE_URL || ARCHIVE_URL;
const chain = process.env.NODE_URL || NODE_URL;

if (!archive || !chain) {
  throw new Error('ARCHIVE_URL and NODE_URL must be set');
}

const network = /rococo/.test(archive) ? 'ROCOCO' : 'PRODUCTION';
logger.note('Welcome to the Processor!', network);

processor.setDataSource({
  archive,
  chain,
});

processor.addEventHandler(Event.createClass, mappings.handleCollectionCreate);
processor.addEventHandler(Event.createInstance, mappings.handleTokenCreate);
processor.addEventHandler(Event.transfer, mappings.handleTokenTransfer);
processor.addEventHandler(Event.burn, mappings.handleTokenBurn);
processor.addEventHandler(Event.destroy, mappings.handleCollectionDestroy);
processor.addEventHandler(Event.priceUpdate, mappings.handleTokenList);
processor.addEventHandler(Event.sold, mappings.handleTokenBuy);
processor.addEventHandler(Event.placeOffer, mappings.handleOfferPlace);
processor.addEventHandler(Event.withdrawOffer, mappings.handleOfferWithdraw);
processor.addEventHandler(Event.acceptOffer, mappings.handleOfferAccept);
processor.addEventHandler(Event.addRoyalty, mappings.handleRoyaltyAdd);
processor.addEventHandler(Event.payRoyalty, mappings.handleRoyaltyPay);

if (network === 'ROCOCO') {
  processor.addEventHandler(Event.createCollection, mappings.handleCollectionCreate);
  processor.addEventHandler(Event.createItem, mappings.handleTokenCreate);
  processor.addEventHandler(Event.transferItem, mappings.handleTokenTransfer);
  processor.addEventHandler(Event.burnItem, mappings.handleTokenBurn);
  processor.addEventHandler(Event.destroyCollection, mappings.handleCollectionDestroy);
}

processor.addPreHook({ range: { from: STARTING_BLOCK, to: STARTING_BLOCK } }, assetMappings.forceCreateBasiliskAsset);
processor.addEventHandler(Event.registerAsset, assetMappings.handleAssetRegister);
processor.addEventHandler(Event.updateAsset, assetMappings.handleAssetUpdate);
processor.addEventHandler(Event.setAssetMetadata, assetMappings.handleAssetMetadata);

processor.run();

// export const setup: DataSelection<EventDataRequest> = {
//   data: {
//     event: true,
//   },
// }
