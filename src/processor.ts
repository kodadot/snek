import {
  SubstrateProcessor,
} from '@subsquid/substrate-processor';
import { Event } from './processable';
import logger from './mappings/utils/logger';
import * as mappings from './mappings';
import * as assetMappings from './mappings/assetRegistry';

const processor = new SubstrateProcessor('snek_nft');

processor.setTypesBundle('basilisk');
processor.setBatchSize(500);
processor.setBlockRange({ from: 6000 });

// Sandbox
// const archive = 'https://basilisk-test.indexer.gc.subsquid.io/v4/graphql';
// const chain = 'wss://basilisk-kodadot.hydration.cloud';

// Rococo
const archive = 'https://basilisk-rococo.play.hydration.cloud/v1/graphql';
const chain = 'wss://rpc-01.basilisk-rococo.hydradx.io';

const network = /rococo/.test(archive) ? 'ROCOCO' : 'SANDBOX';
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

processor.addPreHook({ range: { from: 6000, to: 6000 } }, assetMappings.forceCreateBasiliskAsset);
processor.addEventHandler(Event.registerAsset, assetMappings.handleAssetRegister);
processor.addEventHandler(Event.updateAsset, assetMappings.handleAssetUpdate);
processor.addEventHandler(Event.setAssetMetadata, assetMappings.handleAssetMetadata);

processor.run();
