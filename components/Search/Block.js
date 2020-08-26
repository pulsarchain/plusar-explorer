import { Descriptions, Statistic, Icon } from "antd";
import WrapperSearch from "./Wrapper";
import moment from "moment";
import Link from "@/next-router/Link";
import { getTransactions } from "@/service/plusar";
import { FormattedHTMLMessage } from "react-intl";
import TXRecord from "../Record";
import { useEffect, useState } from "react";

function SearchBlock({ dataSource = {} }) {
  const [state, setState] = useState({
    query: {
      page: 1,
      pageSize: 25
    },
    key: dataSource.number,
    loading: false,
    records: [],
    total: 0
  });
  const fetch = payload => {
    setState({ ...state, loading: true });
    getTransactions({
      page: payload.page,
      size: payload.pageSize,
      key: state.key
    })
      .then(({ data, total }) => {
        setState({ ...state, query: { ...payload }, records: data, total: total, loading: false });
      })
      .catch(() => {
        setState({ loading: false });
      });
  };

  useEffect(() => {
    fetch(state.query);
  }, []);

  return (
    <>
      <WrapperSearch title={<FormattedHTMLMessage id="search.info.header.block" />}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.height" />}>
            <Link href={{ pathname: "/search", query: { q: dataSource.number } }} replace>
              <a>
                <Statistic value={dataSource.number} valueStyle={{ color: "#34d5a5" }} />
              </a>
            </Link>
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.hash" />}>
            <Link href={{ pathname: "/search", query: { q: dataSource.hash } }} replace>
              <a>{dataSource.hash}</a>
            </Link>
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.timestamp" />}>
            {dataSource.timestamp && moment(dataSource.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.isSure" />}>
            {dataSource.confirmationBlocks ? (
              <span className="success">
                <Icon type="check-circle" theme="filled" /> success
              </span>
            ) : (
              <span className="pending">
                <Icon type="clock-circle" theme="filled" /> pending
              </span>
            )}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.hard" />}>
            {dataSource.difficulty}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.size" />}>
            {dataSource.sizeUnit}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.minerAddress" />}>
            <Link href={{ pathname: "/search", query: { q: dataSource.miner } }} replace>
              <a>{dataSource.miner}</a>
              {/* <Copy text={dataSource.miner} /> */}
            </Link>
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.gas" />}>
            <Statistic value={dataSource.gasLimit} />
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.zlclxz" />}>
            <Statistic value={dataSource.gasLimit} />
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.averageGas" />}>
            <Statistic value={dataSource.gasAvgUnit} />
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.uncleHash" />}>
            {dataSource.uncles[0] || "-"}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.rootHashStatus" />}>
            {dataSource.stateRoot}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.parentHash" />}>
            <Link href={{ pathname: "/search", query: { q: dataSource.parentHash } }} replace>
              <a>{dataSource.parentHash}</a>
            </Link>
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.data" />}>
            {dataSource.extraData}
          </Descriptions.Item>

          {/* <Descriptions.Item label={<FormattedHTMLMessage id="search.info.dataFormate" />}>
            {dataSource.extraDataText}
          </Descriptions.Item> */}

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.uncleHashCount" />}>
            {dataSource.uncles.length}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.transitionsCount" />}>
            {dataSource.transactionCount}
          </Descriptions.Item>

          <Descriptions.Item label={<FormattedHTMLMessage id="search.info.nonce" />}>
            {dataSource.nonce}
          </Descriptions.Item>
        </Descriptions>
      </WrapperSearch>

      <div className="block p0">
        <TXRecord
          dataSource={state.records}
          columns={null}
          extraContent={false}
          query={state.query}
          total={state.total}
          loading={state.loading}
          onChange={payload => {
            fetch(payload);
          }}
        />
      </div>
    </>
  );
}

export default SearchBlock;
