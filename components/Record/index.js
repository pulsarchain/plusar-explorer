import moment from "moment";
import Link from "@/next-router/Link";
import { FormattedHTMLMessage } from "react-intl";
import PageTable from "../PageTable";
import { Statistic, Tooltip } from "antd";
const initColumns = [
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.hash" />;
    },
    dataIndex: "hash",
    width: 134,
    render: value => {
      return (
        <div style={{ width: 140 }}>
          <Link href={{ pathname: "/search", query: { q: value } }}>
            <a className="ellipsis">
              <Tooltip title={value} placement="topLeft">
                <span>{value}</span>
              </Tooltip>
            </a>
          </Link>
        </div>
      );
    }
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.block" />;
    },
    dataIndex: "blockNumber",
    width: 70,
    render: value => {
      return (
        <div style={{ width: 70 }}>
          <Link href={{ pathname: "/search", query: { q: value } }}>
            <a className="ellipsis">{value}</a>
          </Link>
        </div>
      );
    }
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.timestamp" />;
    },
    dataIndex: "timestamp",
    width: 185,
    render: timestamp => (timestamp ? moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss") : "-")
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.send" />;
    },
    width: 134,
    dataIndex: "from",
    render: value => {
      return (
        value && (
          <div style={{ width: 140 }}>
            <Link href={{ pathname: "/search", query: { q: value } }}>
              <a className="ellipsis">
                <Tooltip title={value} placement="topLeft">
                  <span>{value}</span>
                </Tooltip>
              </a>
            </Link>
          </div>
        )
      );
    }
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.receiver" />;
    },
    dataIndex: "to",
    width: 134,
    render: value => {
      return (
        value && (
          <div style={{ width: 140 }}>
            <Link href={{ pathname: "/search", query: { q: value } }}>
              <a className="ellipsis">
                <Tooltip title={value} placement="topLeft">
                  <span>{value}</span>
                </Tooltip>
              </a>
            </Link>
          </div>
        )
      );
    }
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.transactionsNum" />;
    },
    dataIndex: "value",
    width: 150,
    render: value => {
      return <Statistic value={value} precision={3} />;
    }
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.handlingFee" />;
    },
    dataIndex: "gasFee",
    width: 134,
    render: value => {
      return <Statistic value={value} precision={value && value.length > 12 ? 8 : null} />;
    }
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="search.info.averageGas" />;
    },
    dataIndex: "gasAvg",
    width: 114,
    render: value => {
      return <Statistic value={value} />;
    }
  }
];

function TXRecord({ dataSource = [], query = {}, columns = {}, title, total = 0, onChange, loading, extraContent,locale,...reset }) {
  return (
    <div className="transiton-record-wrap">
      <PageTable
        rowKey="_id"
        dataSource={dataSource}
        columns={columns ? columns : initColumns}
        query={query}
        total={total}
        onChange={onChange}
        loading={loading}
        extraContent={extraContent}
        locale={locale}
        {...reset}
        title={title ? title : <FormattedHTMLMessage id="table.tx.title" />}
      />
    </div>
  );
}
export default TXRecord;
