export type AssetRegisterEvent = {
  id: string;
  name: string;
  type: string;
  isToken: boolean;
  deposit?: bigint;
};

export type AssetMetadata = {
  id: string;
  symbol: string;
  decimals: number;
};
