import { FiX } from "react-icons/fi";
import { HeaderLink } from "./HeaderLink";
import logoImg from "../../img/logo_GMX.svg";

import "./Header.css";
import { isHomeSite } from "../../lib/legacy";
import { Trans } from "@lingui/macro";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  small?: boolean;
  clickCloseIcon?: () => void;
  openSettings?: () => void;
  redirectPopupTimestamp: number;
  showRedirectModal: (to: string) => void;
};

export function AppHeaderLinks({
  small,
  openSettings,
  clickCloseIcon,
  redirectPopupTimestamp,
  showRedirectModal,
}: Props) {
  const development = window.location.hostname === "localhost";
  const beasHttpUrl = development ? "http://localhost:3011/#" : "http://3.0.92.219:3306/#";

  const applink = [
    {
      title: "Dashboard",
      url: `${beasHttpUrl}/dashboard`,
    },
    {
      title: "Earn",
      url: `${beasHttpUrl}/earn`,
    },
    // {
    //   title: "Buy",
    //   url: `${beasHttpUrl}/buy`,
    // },
    {
      title: "Referrals",
      url: `${beasHttpUrl}/referrals`,
    },
    {
      title: "Ecosystem",
      url: `${beasHttpUrl}/ecosystem`,
    },
    {
      title: "Docs",
      url: "https://gmxio.gitbook.io/gmx/",
    },
  ];

  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src={logoImg} alt="DFEX Logo" />
          </Link>
          <div
            className="App-header-menu-icon-block mobile-cross-menu"
            onClick={() => clickCloseIcon && clickCloseIcon()}
          >
            <FiX className="App-header-menu-icon" />
          </div>
        </div>
      )}
      {/* <div className="App-header-link-container">
        <HeaderLink
          to="/dashboard"
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Dashboard</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink to="/earn" redirectPopupTimestamp={redirectPopupTimestamp} showRedirectModal={showRedirectModal}>
          <Trans>Earn</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink to="/buy" redirectPopupTimestamp={redirectPopupTimestamp} showRedirectModal={showRedirectModal}>
          <Trans>Buy</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink
          to="/referrals"
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Referrals</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink
          to="/ecosystem"
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Ecosystem</Trans>
        </HeaderLink>
      </div> */}

      <div className="App-header-link-container" >
        <a href={`${beasHttpUrl}/dashboard`} target="_self" rel="noopener noreferrer">
          <Trans>Dashboard</Trans>
        </a>
        <a href={`${beasHttpUrl}/earn`} target="_self" rel="noopener noreferrer">
          <Trans>Earn</Trans>
        </a>
        <a href={`${beasHttpUrl}/referrals`} target="_self" rel="noopener noreferrer">
          <Trans>Referrals</Trans>
        </a>
        <a href={`${beasHttpUrl}/ecosystem`} target="_self" rel="noopener noreferrer">
          <Trans>Ecosystem</Trans>
        </a>
        <a href="https://gmxio.gitbook.io/gmx/" target="_self" rel="noopener noreferrer">
          <Trans>Docs</Trans>
        </a>
      </div>

      {small && !isHomeSite() && (
        <div className="App-header-link-container">
          {/* eslint-disable-next-line */}
          <a href="#" onClick={openSettings}>
            <Trans>Settings</Trans>
          </a>
        </div>
      )}
    </div>
  );
}
