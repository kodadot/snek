/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { isProd } from '../../../environment';
import {
  AcceptOfferEvent,
  AddRoyaltyEvent,
  BurnTokenEvent,
  BuyTokenEvent,
  Context,
  CreateCollectionEvent,
  CreateTokenEvent,
  DestroyCollectionEvent,
  ListTokenEvent,
  MakeOfferEvent,
  PayRoyaltyEvent,
  TransferTokenEvent,
  WithdrawOfferEvent,
} from '../../utils/types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const proc: any = isProd ? require('./basilisk') : require('./snek');

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  return proc.getCreateCollectionEvent(ctx);
}
export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  return proc.getCreateTokenEvent(ctx);
}
export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  return proc.getTransferTokenEvent(ctx);
}
export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  return proc.getBurnTokenEvent(ctx);
}
export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  return proc.getDestroyCollectionEvent(ctx);
}
export function getListTokenEvent(ctx: Context): ListTokenEvent {
  return proc.getListTokenEvent(ctx);
}
export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  return proc.getBuyTokenEvent(ctx);
}
export function getAddRoyaltyEvent(ctx: Context): AddRoyaltyEvent {
  return proc.getAddRoyaltyEvent(ctx);
}
export function getPayRoyaltyEvent(ctx: Context): PayRoyaltyEvent {
  return proc.getPayRoyaltyEvent(ctx);
}
export function getPlaceOfferEvent(ctx: Context): MakeOfferEvent {
  return proc.getPlaceOfferEvent(ctx);
}
export function getWithdrawOfferEvent(ctx: Context): WithdrawOfferEvent {
  return proc.getWithdrawOfferEvent(ctx);
}
export function getAcceptOfferEvent(ctx: Context): AcceptOfferEvent {
  return proc.getAcceptOfferEvent(ctx);
}
