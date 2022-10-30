import { ARBITRUM, AVALANCHE ,POLYGON} from "./chains";

export const SUBGRAPH_URLS = {
  [ARBITRUM]: {
    stats: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-arbitrum-referrals",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/gmx-vault",
  },

  [AVALANCHE]: {
    stats: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-avalanche-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-avalanche-referrals",
  },

  [POLYGON]: {
    stats: "https://api.thegraph.com/subgraphs/name/kisenyang/gmx-avalanche-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/kisenyang/dfex-polygone-referrals",
  },
  common: {
    chainLink: "https://api.thegraph.com/subgraphs/name/deividask/chainlink",
  },
};
