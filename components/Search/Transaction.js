import { Descriptions, Statistic, Icon } from "antd";
import WrapperSearch from "./Wrapper";
// import Type from "../Type";
import moment from "moment";
import Link from "@/next-router/Link";
import { FormattedHTMLMessage } from "react-intl";
import Copy from "../Copy";
function SearchTransaction({ dataSource = {} }) {
  return (
    <WrapperSearch
      title={
        <span>
          <FormattedHTMLMessage id="search.info.header.tx" />
        </span>
      }
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.hash" />}>
          {dataSource.hash}
          <Copy text={dataSource.hash} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.status" />}>
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

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.height" />}>
          <Link href={{ pathname: "/search", query: { q: dataSource.blockNumber } }} replace>
            <a>
              <Statistic value={dataSource.blockNumber} valueStyle={{ color: "#34d5a5" }} />
            </a>
          </Link>
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.blockSureCount" />}>
          <Statistic value={dataSource.confirmationBlocks} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.timestamp" />}>
          {dataSource.timestamp && moment(dataSource.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.send" />}>
          <Link href={{ pathname: "/search", query: { q: dataSource.from } }} replace>
            <a>{dataSource.from}</a>
          </Link>
          <Copy text={dataSource.from} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.receiver" />}>
          <Link href={{ pathname: "/search", query: { q: dataSource.to } }} replace>
            <a>{dataSource.to}</a>
          </Link>
          <Copy text={dataSource.to} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.transactionsNum" />}>
          <Statistic value={dataSource.value} precision={3} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.handlingFee" />}>
          <Statistic
            value={dataSource.gasFee}
            precision={dataSource.gasFee && dataSource.gasFee.length > 8 ? 8 : null}
          />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.gasPrice" />}>
          <Statistic value={dataSource.gasPrice} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="table.tx.gas" />}>
          <Statistic value={dataSource.gas} />
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.gasConsume" />}>
          {dataSource.gasUsed ? <Statistic value={dataSource.gasUsed} /> : "-"}
        </Descriptions.Item>

        <Descriptions.Item label={<FormattedHTMLMessage id="search.info.nonce" />}>
          <Statistic value={dataSource.nonce} />
        </Descriptions.Item>
      </Descriptions>
    </WrapperSearch>
  );
}

export default SearchTransaction;
