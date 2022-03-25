
import { ExtrinsicHandlerContext, SubstrateExtrinsic, SubstrateEvent, EventHandlerContext } from '@subsquid/substrate-processor'
import { BaseCall } from './types'


function toBaseCall(extrinsic: ExtrinsicHandlerContext): BaseCall {
  const caller = extrinsic.extrinsic.signer.toString();
  const blockNumber = extrinsic.block.height.toString();
  const timestamp = new Date(extrinsic.block.timestamp);

  return { caller, blockNumber, timestamp };
}

// function toBaseEvent(event: EventHandlerContext): BaseCall {
//   const caller = event.caller;
//   const blockNumber = event.blockNumber.toString();
//   const timestamp = new Date(event.timestamp);

//   return { caller, blockNumber, timestamp };
// }

