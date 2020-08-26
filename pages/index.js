import React, { PureComponent } from "react";
import { FormattedHTMLMessage } from "react-intl";
import Link from "@/next-router/Link";
import { Row, Col, Icon } from "antd";
import io from "socket.io-client";
import node from "@/assets/img/bosa/block.png";
import _time from "@/assets/img/bosa/time.png";
import tps from "@/assets/img/bosa/tps.png";
import hz from "@/assets/img/bosa/hz.png";
import hz_en from "@/assets/img/bosa/hz_en.png";
import difficulty from "@/assets/img/bosa/difficulty.png";
import hash from "@/assets/img/bosa/hash.png";
import { getTransactions, getBlocks } from "@/service/plusar";
import Slots from "@/components/Slots";
import CountUp from "react-countup";
import styles from "@/assets/styles.less";
import { latestTransitionColumns } from "@/utils/column";
class Home extends PureComponent {
  static async getInitialProps() {
    const { data: block } = await getBlocks({ page: 1, size: 10 });
    const { data: transactions } = await getTransactions({ page: 1, size: 10 });
    return { transactions, block };
  }
  constructor(props) {
    super(props);
    this.state = { block: props.block || [], transactions: props.transactions || {}, info: {} };
  }
  socket = null;
  componentDidMount() {
    this.socket = io(process.env.baseURL, { transports: ["websocket"] });
    this.socket.on("connect", () => {
      console.log("connect!");
      this.socket.emit("ws");
    });
    this.socket.on("message", ({ overview: info, blocks: block }) => {
      this.setState({
        info,
        block
      });
    });
  }
  componentWillUnmount() {
    this.socket.close();
  }
  render() {
    // const noticeHz = this.props.locale === "zh-CN" ? hz : hz_en;
    const { block, transactions, info } = this.state;
    const height = (
      <a>
        <img src={node} height={36} alt="block" />
        <div className="ellipsis">
          {info.blockNumber ? <CountUp end={info.blockNumber} /> : <Icon type="loading" />}
        </div>
        <div className="title">
          <FormattedHTMLMessage id="table.LatestBlock" />
        </div>
      </a>
    );

    const time = (
      <a>
        <img src={_time} height={36} alt="block" />
        <div className="ellipsis">{info.blockTime ? `${info.blockTime}(s)` : <Icon type="loading" />}</div>
        <div className="title">
          <FormattedHTMLMessage id="pulsar.blockTime" />
        </div>
      </a>
    );

    const cmtps = (
      <a>
        <img src={tps} height={36} alt="tps" />
        <div className="ellipsis">{info.tps ? info.tps : <Icon type="loading" />}</div>
        <div className="title">
          <FormattedHTMLMessage id="pulsar.TPS" />
        </div>
      </a>
    );

    const diffcult = (
      <a>
        <img src={difficulty} height={36} alt="tps" />
        <div className="ellipsis">{info.difficulty ? info.difficulty : <Icon type="loading" />}</div>
        <div className="title">
          <FormattedHTMLMessage id="pulsar.currentDiff" />
        </div>
      </a>
    );

    const hashRate = (
      <a>
        <img src={hash} height={36} alt="tps" />
        <div className="ellipsis">{info.hashRate === 0 || info.hashRate ? info.hashRate : <Icon type="loading" />}</div>
        <div className="title">
          <FormattedHTMLMessage id="pulsar.hashRate" />
        </div>
      </a>
    );

    return (
      <>
        <div className="blocks block">
          <div className="blocks-container">
            <Row gutter={24}>
              <Col xs={12} lg={4}>
                {info.blockNumber ? (
                  <Link href={{ pathname: "/search", query: { q: info.blockNumber } }}>{height}</Link>
                ) : (
                  height
                )}
              </Col>

              <Col xs={11} lg={4} offset={1}>
                {time}
              </Col>

              <Col xs={7} lg={4} offset={1}>
                {info.tps ? <Link href="/transactions">{cmtps}</Link> : cmtps}
              </Col>

              <Col xs={7} lg={4} offset={1}>
                {diffcult}
              </Col>

              <Col xs={7} lg={4} offset={1}>
                {hashRate}
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.content}>
          <div>{/* <img src={noticeHz} className="fix-intro" /> */}</div>
          <Slots dataSource={block} />
          <Slots
            href="/transactions.html"
            dataSource={transactions.sort((a, b) => b.timestamp - a.timestamp)}
            columns={latestTransitionColumns}
            title={<FormattedHTMLMessage id="pulsar.latestDeal" />}
          />
        </div>
      </>
    );
  }
}

export default Home;
