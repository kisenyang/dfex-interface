import React from "react";
import Footer from "components/Footer/Footer";
import cx from "classnames";
import "./Home.css";

// import simpleSwapIcon from "img/ic_simpleswaps.svg";
// import costIcon from "img/ic_cost.svg";
// import liquidityIcon from "img/ic_liquidity.svg";
// import totaluserIcon from "img/ic_totaluser.svg";
// import arbitrumIcon from "img/ic_arbitrum_96.svg";
// import avaIcon from "img/ic_avalanche_96.svg";
// import statsIcon from "img/ic_stats.svg";
// import tradingIcon from "img/ic_trading.svg";

import bannerIcon from "../../img/dfex/banner.png";
import DFEXIcon from "../../img/dfex/03.png";
import GLPIcon from "../../img/dfex/04.png";
import TotalData1Icon from "../../img/dfex/05.png";
import TotalData2Icon from "../../img/dfex/06.png";
import TotalData3Icon from "../../img/dfex/07.png";
import TotalData4Icon from "../../img/dfex/08.png";
import TotalData5Icon from "../../img/dfex/09.png";

import RisksIcon from "../../img/dfex/10.png";
import SavingsIcon from "../../img/dfex/11.png";
import SwapsIcon from "../../img/dfex/12.png";

import useSWR from "swr";

import { USD_DECIMALS, getTotalVolumeSum } from "lib/legacy";

import { useUserStat } from "domain/legacy";

// import TokenCard from "components/TokenCard/TokenCard";
import { Trans } from "@lingui/macro";
import { HeaderLink } from "components/Header/HeaderLink";
import { ARBITRUM, AVALANCHE } from "config/chains";
import { getServerUrl } from "config/backend";
import { bigNumberify, formatAmount, numberWithCommas } from "lib/numbers";


export default function Home({ showRedirectModal, redirectPopupTimestamp }) {
  // const [openedFAQIndex, setOpenedFAQIndex] = useState(null)
  // const faqContent = [{
  //   id: 1,
  //   question: "What is GMX?",
  //   answer: "GMX is a decentralized spot and perpetual exchange that supports low swap fees and zero price impact trades.<br><br>Trading is supported by a unique multi-asset pool that earns liquidity providers fees from market making, swap fees, leverage trading (spreads, funding fees & liquidations), and asset rebalancing.<br><br>Dynamic pricing is supported by Chainlink Oracles along with TWAP pricing from leading volume DEXs."
  // }, {
  //   id: 2,
  //   question: "What is the DFEX Governance Token? ",
  //   answer: "The DFEX token is the governance token of the DFEX ecosystem, it provides the token owner voting rights on the direction of the DFEX platform.<br><br>Additionally, when DFEX is staked you will earn 30% of the platform-generated fees, you will also earn Escrowed DFEX tokens and Multiplier Points."
  // }, {
  //   id: 3,
  //   question: "What is the DLP Token? ",
  //   answer: "The DLP token represents the liquidity users provide to the DFEX platform for Swaps and Margin Trading.<br><br>To provide liquidity to DLP you <a href='https://gmx.io/buy_glp' target='_blank'>trade</a> your crypto asset BTC, ETH, LINK, UNI, USDC, USDT, MIM, or FRAX to the liquidity pool, in exchange, you gain exposure to a diversified index of tokens while earning 50% of the platform trading fees and esGMX."
  // }, {
  //   id: 4,
  //   question: "What can I trade on GMX? ",
  //   answer: "On DFEX you can swap or margin trade any of the following assets: ETH, BTC, LINK, UNI, USDC, USDT, MIM, FRAX, with others to be added. "
  // }]

  // const toggleFAQContent = function(index) {
  //   if (openedFAQIndex === index) {
  //     setOpenedFAQIndex(null)
  //   } else {
  //     setOpenedFAQIndex(index)
  //   }
  // }

  // ARBITRUM
  const launchApp = "https://app.gmx.io/";
  const arbitrumPositionStatsUrl = getServerUrl(ARBITRUM, "/position_stats");
  const { data: arbitrumPositionStats } = useSWR([arbitrumPositionStatsUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  const arbitrumTotalVolumeUrl = getServerUrl(ARBITRUM, "/total_volume");
  const { data: arbitrumTotalVolume } = useSWR([arbitrumTotalVolumeUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  // AVALANCHE

  const avalanchePositionStatsUrl = getServerUrl(AVALANCHE, "/position_stats");
  const { data: avalanchePositionStats } = useSWR([avalanchePositionStatsUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  const avalancheTotalVolumeUrl = getServerUrl(AVALANCHE, "/total_volume");
  const { data: avalancheTotalVolume } = useSWR([avalancheTotalVolumeUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  // Total Volume

  const arbitrumTotalVolumeSum = getTotalVolumeSum(arbitrumTotalVolume);
  const avalancheTotalVolumeSum = getTotalVolumeSum(avalancheTotalVolume);

  let totalVolumeSum = bigNumberify(0);
  if (arbitrumTotalVolumeSum && avalancheTotalVolumeSum) {
    totalVolumeSum = totalVolumeSum.add(arbitrumTotalVolumeSum);
    totalVolumeSum = totalVolumeSum.add(avalancheTotalVolumeSum);
  }

  // Open Interest

  let openInterest = bigNumberify(0);
  if (
    arbitrumPositionStats &&
    arbitrumPositionStats.totalLongPositionSizes &&
    arbitrumPositionStats.totalShortPositionSizes
  ) {
    openInterest = openInterest.add(arbitrumPositionStats.totalLongPositionSizes);
    openInterest = openInterest.add(arbitrumPositionStats.totalShortPositionSizes);
  }

  if (
    avalanchePositionStats &&
    avalanchePositionStats.totalLongPositionSizes &&
    avalanchePositionStats.totalShortPositionSizes
  ) {
    openInterest = openInterest.add(avalanchePositionStats.totalLongPositionSizes);
    openInterest = openInterest.add(avalanchePositionStats.totalShortPositionSizes);
  }

  // user stat
  const arbitrumUserStats = useUserStat(ARBITRUM);
  const avalancheUserStats = useUserStat(AVALANCHE);
  let totalUsers = 0;

  if (arbitrumUserStats && arbitrumUserStats.uniqueCount) {
    totalUsers += arbitrumUserStats.uniqueCount;
  }

  if (avalancheUserStats && avalancheUserStats.uniqueCount) {
    totalUsers += avalancheUserStats.uniqueCount;
  }

  // const LaunchExchangeButton = () => {
  //   return (
  //     <HeaderLink
  //       className={cx("default-btn")}
  //       to="/trade"
  //       redirectPopupTimestamp={redirectPopupTimestamp}
  //       showRedirectModal={showRedirectModal}
  //     >
  //       <Trans>Launch Exchange</Trans>
  //     </HeaderLink>
  //   );
  // };

  return (
    <div className="Home">
      <div className="Home-top">
        <img className="banner" src={bannerIcon} alt="" />
        {/* <div className="Home-top-image"></div> */}
        <div className="Home-title-section-container default-container">
          <div className="Home-title-section">
            <div className="Home-title">
              <Trans>DFEX.IO</Trans>
            </div>
            <div className="Home-description">
              <Trans>Decentralised Futures Exchange: A platform made by traders, for traders</Trans>
            </div>
            {/* <LaunchExchangeButton /> */}
          </div>
        </div>
      </div>

      <div className="Home-benefits-section">
        <div className="Home-benefits default-container">
          <div className="Home-benefit default-container">
            <div className="Home-benefit-top">
              <div className="Home-benefit-icon">
                <img src={DFEXIcon} alt="liquidity" className="Home-benefit-icon-symbol" />
                <div className="Home-benefit-title">
                  <Trans>DFEX</Trans>
                </div>
              </div>
              <div className="Home-benefit-description">
                <Trans>
                  Trade BTC, ETH, MATIC and other bluechip digital assets with up to 30x leverage directly via your web3
                  wallet.
                </Trans>
              </div>
            </div>

            <div className="Home-launch-App">
              <a href={launchApp} className="Home-launch-exchange">
                Launch Exchange
                <div className="launch-App-go"></div>
              </a>
            </div>
          </div>
          <div className="Home-benefit default-container">
            <div className="Home-benefit-top">
              <div className="Home-benefit-icon">
                <img src={DFEXIcon} alt="liquidity" className="Home-benefit-icon-symbol" />
                <div className="Home-benefit-title">
                  <Trans>DFEX</Trans>
                </div>
              </div>
              <div className="Home-benefit-description">
                <Trans>
                  DFEX is the governance and utility token of DFEX.io. Accrue 30% of the platform’s fees “Buy on
                  Polygon(MATIC)”
                </Trans>
              </div>
            </div>

            <div className="Home-launch-App">
              <a href={launchApp} className="Home-launch-exchange">
                Launch Exchange
                <div className="launch-App-go"></div>
              </a>
            </div>
          </div>
          <div className="Home-benefit default-container">
            <div className="Home-benefit-top">
              <div className="Home-benefit-icon">
                <img src={GLPIcon} alt="cost" className="Home-benefit-icon-symbol" />
                <div className="Home-benefit-title">
                  <Trans>DLP</Trans>
                </div>
              </div>
              <div className="Home-benefit-description">
                <Trans>
                  DLP is the liquidity provider token. Accrue 60% of the platform’s fees. “Buy on Polygon (MATIC)”
                </Trans>
              </div>
            </div>
            <div className="Home-launch-App">
              <a href={launchApp} className="Home-launch-exchange">
                Launch Exchange
                <div className="launch-App-go"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Total Trading Volume */}

      <div className="Home-latest-info-container ">
        <div className="Home-latest-info-warp default-container">
          <div className="Home-latest-info-block">
            <img src={TotalData1Icon} alt="trading" className="Home-latest-info__icon" />
            <div className="Home-latest-info__title">
              <Trans>Total Trading Volume</Trans>
            </div>
            <div className="Home-latest-info__value">${formatAmount(totalVolumeSum, USD_DECIMALS, 0, true)}</div>
          </div>
          <div className="Home-latest-info-block">
            <img src={TotalData2Icon} alt="trading" className="Home-latest-info__icon" />
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>Open Interest</Trans>
              </div>
              <div className="Home-latest-info__value">${formatAmount(openInterest, USD_DECIMALS, 0, true)}</div>
            </div>
          </div>
          <div className="Home-latest-info-block">
            <img src={TotalData3Icon} alt="trading" className="Home-latest-info__icon" />
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>Total Users</Trans>
              </div>
              <div className="Home-latest-info__value">{numberWithCommas(totalUsers.toFixed(0))}</div>
            </div>
          </div>

          <div className="Home-latest-info-block">
            <img src={TotalData4Icon} alt="trading" className="Home-latest-info__icon" />
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>MATIC APR</Trans>
              </div>
              <div className="Home-latest-info__value">{numberWithCommas(totalUsers.toFixed(0))}</div>
            </div>
          </div>

          <div className="Home-latest-info-block">
            <img src={TotalData5Icon} alt="trading" className="Home-latest-info__icon" />
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>MATIC APR</Trans>
              </div>
              <div className="Home-latest-info__value">{numberWithCommas(totalUsers.toFixed(0))}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Exchange */}

      <div className="home-info default-container">
        <div className="home-info-item default-container">
          <div className="home-info-item-header">
            <img src={RisksIcon} alt="trading" className="Home-latest-info__icon" />
            <p className="home-info-title">
              <Trans>Minimise Liquidation Risks</Trans>
            </p>
          </div>

          <div className="home-info-desc">
            <Trans>
              Liquidations occur with accuracy as data is aggregated using high-quality price feeds, keeping positions
              from liquidated by short-term illiquid volatility.
            </Trans>
          </div>
          <a href={launchApp} className=" Home-info-documentation">
            Launch Exchange
          </a>
        </div>

        <div className="home-info-item default-container">
          <div className="home-info-item-header">
            <img src={SavingsIcon} alt="trading" className="Home-latest-info__icon" />
            <p className="home-info-title">
              <Trans>Cost Savings</Trans>
            </p>
          </div>

          <div className="home-info-desc">
            <Trans>
              Our platform allows for zero price impact on your trades, allowing traders to enter and exit positions
              with minimal spread.
            </Trans>
          </div>
          <a href={launchApp} className=" Home-info-documentation">
            Launch Exchange
          </a>
        </div>
        <div className="home-info-item default-container">
          <div className="home-info-item-header">
            <img src={SwapsIcon} alt="trading" className="Home-latest-info__icon" />

            <p className="home-info-title">
              <Trans>Simple UI and Swaps</Trans>
            </p>
          </div>

          <div className="home-info-desc">
            <Trans>
              Keeping it super simple, traders could conveniently swap from any supported asset into the position of
              your choice.
            </Trans>
          </div>
          <a href={launchApp} className=" Home-info-documentation">
            Launch Exchange
          </a>
        </div>
      </div>

      <Footer showRedirectModal={showRedirectModal} redirectPopupTimestamp={redirectPopupTimestamp} />
    </div>
  );
}
