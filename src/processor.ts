import {
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { Event } from './processable'
import logger from './mappings/utils/logger'
import * as mappings from './mappings'

const processor = new SubstrateProcessor("snek_nft");

// processor.setTypesBundle("basilisk");
processor.setBatchSize(500);
processor.setBlockRange({ from: 8700 });

const archive = 'https://basilisk-test.indexer.gc.subsquid.io/v4/graphql' ?? lookupArchive("basilisk")[0].url

logger.note("Welcome to the Processor!", archive);

processor.setDataSource({
  archive,
  chain: "wss://basilisk-kodadot.hydration.cloud",
});

const dummy = async () => {}

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

processor.run();
