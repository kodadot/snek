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
const archive = process.env.ARCHIVE_URL ?? lookupArchive("basilisk")[0].url

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
// processor.addEventHandler(Event.priceUpdate, dummy);
// processor.addEventHandler(Event.sold, dummy);
// processor.addEventHandler(Event.placeOffer, dummy);
// processor.addEventHandler(Event.withdrawOffer, dummy);
// processor.addEventHandler(Event.acceptOffer, dummy);
// processor.addEventHandler(Event.payRoyalty, dummy);
// processor.addEventHandler(Event.addRoyalty, dummy);

processor.run();
