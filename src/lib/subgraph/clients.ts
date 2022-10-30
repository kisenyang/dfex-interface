import { createClient } from "./utils";
import { SUBGRAPH_URLS } from "config/subgraph";
import { ARBITRUM, ARBITRUM_TESTNET, AVALANCHE, POLYGON } from "config/chains";

export const chainlinkClient = createClient(SUBGRAPH_URLS.common.chainLink);

export const arbitrumGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].stats);
export const arbitrumReferralsGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].referrals);
export const nissohGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].nissohVault);

export const avalancheGraphClient = createClient(SUBGRAPH_URLS[AVALANCHE].stats);
export const avalancheReferralsGraphClient = createClient(SUBGRAPH_URLS[AVALANCHE].referrals);

export const polygonGraphClient = createClient(SUBGRAPH_URLS[POLYGON].stats);
export const polygonReferralsGraphClient = createClient(SUBGRAPH_URLS[POLYGON].referrals);

export function getGmxGraphClient(chainId: number) {
  if (chainId === ARBITRUM) {
    return arbitrumGraphClient;
  } else if (chainId === AVALANCHE) {
    return avalancheGraphClient;
  } else if (chainId === ARBITRUM_TESTNET) {
    return null;
  } else if (chainId === POLYGON) {
    return polygonGraphClient;
  }

  throw new Error(`Unsupported chain ${chainId}`);
}
