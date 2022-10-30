import React, { useState, useEffect } from "react";
import { Modal, Button, Radio, Col, Row, Typography } from "antd";
import moment from "moment";
import closeIcon from "../../img/dfex/close.png";
import "./airdrop.scss";
const { Text } = Typography;

interface DataProps {
  visible?: false | true; // 弹窗状态
  loading?: false | true; // 弹窗状态
  closeModal: () => any; // 关闭弹窗
  startTime: any;
}

const Airdrop = ({
  visible = false,
  loading = false,
  closeModal = () => {},
  startTime = new Date().getTime(),
}: DataProps) => {
  //   let start = moment(new Date().getTime()); //获取开始时间
  //   let end = moment(startTime); //结束时间
  //   let diff = end.diff(start); //时间差
  let diff = startTime; //结束时间

  return (
    <Modal
      footer={null}
      title={null}
      visible={visible}
      centered
      closable={false}
      className="airdrop-warp"
      keyboard
      mask
      width={420}
      maskClosable
      zIndex={999}
    >
      <div className="airdrop-content">
        <div className="close-icon">
          <img onClick={closeModal} src={closeIcon} alt="" />
        </div>

        <div className="airdrop-content-time">
          <Row className="title">
            <Col span={8}>Days</Col>
            <Col span={8}>hours</Col>
            <Col span={8}>seconds</Col>
          </Row>

          <Row className="time">
            <Col span={8}>
              <div className="definite">{moment.duration(diff).days()}</div>
            </Col>
            <Col span={8}>
              <div className="definite">{moment.duration(diff).hours()}</div>
            </Col>
            <Col span={8}>
              <div className="definite">{moment.duration(diff).seconds()}</div>
            </Col>
          </Row>

          <Text className="airdrop-content-desc">
            AIRDROP AIRDROP AIRDROPAIRDROP AIRDROP AIRDROPAIRDROP AIRDROP AIRDROPAIRDROP AIRDROP AIRDROPAIRDROP AIRDROP
            AIRDROPAIRDROP AIRDROP AIRDROPAIRDROP AIRDROP AIRDROPAIRDROP AIRDROP AIRDROP
          </Text>

          <Button type="primary" shape="round" size="middle">
            know more
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Airdrop;
