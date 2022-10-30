import React, { ReactNode, useEffect, useState, useCallback } from "react";
import cx from "classnames";
import { Col, Row, Statistic } from "antd";
// import { AppHeaderUser } from "./AppHeaderUser";
import { AppHeaderLinks } from "./AppHeaderLinks";
import Airdrop from "./../airdrop/airdrop";
import { Link } from "react-router-dom";
import logoImg from "../../img/logo_GMX.svg";
import logoSmallImg from "../../img/logo_GMX_small.svg";
import { RiMenuLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence as FramerAnimatePresence, motion } from "framer-motion";

import "./Header.css";
import "./../airdrop/airdrop.scss";

const { Countdown } = Statistic;
const startTime = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

// Fix framer-motion old React FC type (solved in react 18)
const AnimatePresence = (props: React.ComponentProps<typeof FramerAnimatePresence> & { children: ReactNode }) => (
  <FramerAnimatePresence {...props} />
);

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

type Props = {
  disconnectAccountAndCloseSettings: () => void;
  openSettings: () => void;
  setWalletModalVisible: (visible: boolean) => void;
  redirectPopupTimestamp: number;
  showRedirectModal: (to: string) => void;
};

export function HomeHeader({
  disconnectAccountAndCloseSettings,
  openSettings,
  setWalletModalVisible,
  redirectPopupTimestamp,
  showRedirectModal,
}: Props) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isNativeSelectorModalVisible, setIsNativeSelectorModalVisible] = useState(false);
  const [visible, setVisible] = useState(false); //
  const showVisible = useCallback(() => {
    setVisible(true);
  }, []);
  const hideVisible = useCallback(() => {
    setVisible(false);
  }, []);

  const AirdropLoading = false;
  const [isAirdropTime, setIsAirdropTime] = useState(startTime > new Date().getTime() || false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isDrawerVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerVisible]);

  return (
    <>
      {isAirdropTime && (
        <div className="airdrop" onClick={showVisible}>
          <Row gutter={16} align="middle">
            <Col span={24} style={{ height: "5.8rem", color: "#FFFFFF" }} className="scroll-wrap">
              <Countdown
                className="scroll-item"
                valueStyle={{ color: "#FFFFFF", textAlign: "center" }}
                loading={AirdropLoading}
                value={startTime}
                prefix={"Airdrop Countdown days:"}
                format="D  [hours]  :H [seconds]: s"
                onFinish={() => {
                  visible && hideVisible();
                  setIsAirdropTime(false);
                }}
                onChange={(value: any) => {
                  setTime(value);
                }}
              />
            </Col>
          </Row>
        </div>
      )}

      <Airdrop visible={visible} loading={false} startTime={time} closeModal={hideVisible} />

      {isDrawerVisible && (
        <AnimatePresence>
          {isDrawerVisible && (
            <motion.div
              className="App-header-backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerVisible(!isDrawerVisible)}
            ></motion.div>
          )}
        </AnimatePresence>
      )}
      {isNativeSelectorModalVisible && (
        <AnimatePresence>
          {isNativeSelectorModalVisible && (
            <motion.div
              className="selector-backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
              transition={{ duration: 0.2 }}
              onClick={() => setIsNativeSelectorModalVisible(!isNativeSelectorModalVisible)}
            ></motion.div>
          )}
        </AnimatePresence>
      )}
      <header>
        <div className="App-header large">
          <div className="App-header-container-left">
            <Link className="App-header-link-main" to="/">
              <img src={logoImg} className="big" alt="DFEX Logo" />
              <img src={logoSmallImg} className="small" alt="DFEX Logo" />
            </Link>
          </div>
          <div className="App-header-container-right App-homeheader-container-right">
            {/* <AppHeaderUser
              disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
              openSettings={openSettings}
              setWalletModalVisible={setWalletModalVisible}
              redirectPopupTimestamp={redirectPopupTimestamp}
              showRedirectModal={showRedirectModal}
            /> */}
            <AppHeaderLinks redirectPopupTimestamp={redirectPopupTimestamp} showRedirectModal={showRedirectModal} />
          </div>
        </div>
        <div className={cx("App-header", "small", { active: isDrawerVisible })}>
          <div
            className={cx("App-header-link-container", "App-header-top", {
              active: isDrawerVisible,
            })}
          >
            <div className="App-header-container-left">
              <div className="App-header-menu-icon-block" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                {isDrawerVisible && <FaTimes className="App-header-menu-icon" />}
              </div>
              <div className="App-header-link-main clickable" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
                <img src={logoImg} className="small" alt="DFEX Logo" />
                <img src={logoSmallImg} className=" big" alt="DFEX Logo" />
              </div>
            </div>
            <div className="App-header-container-right" onClick={() => setIsDrawerVisible(!isDrawerVisible)}>
              {!isDrawerVisible && <RiMenuLine className="App-header-menu-icon" />}
              {/* <AppHeaderUser
                disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
                openSettings={openSettings}
                small
                setWalletModalVisible={setWalletModalVisible}
                redirectPopupTimestamp={redirectPopupTimestamp}
                showRedirectModal={showRedirectModal}
              /> */}
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isDrawerVisible && (
          <motion.div
            onClick={() => setIsDrawerVisible(false)}
            className="App-header-links-container App-header-drawer"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants}
            transition={{ duration: 0.2 }}
          >
            <AppHeaderLinks
              small
              openSettings={openSettings}
              clickCloseIcon={() => setIsDrawerVisible(false)}
              redirectPopupTimestamp={redirectPopupTimestamp}
              showRedirectModal={showRedirectModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
