import { FormattedHTMLMessage } from "react-intl";
import moment from "moment";
import Link from "@/next-router/Link";
import { Statistic, Tooltip } from "antd";

// 区块页面的表格字段
const blockCloumn = [
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.block" />;
    },
    dataIndex: "number",
    width: 100,
    render: value => {
      return (
        <div style={{ width: 80 }}>
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
    width: 240,
    render: timestamp => moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.transactionsNum" />;
    },
    dataIndex: "transactionCount",
    width: 140
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.miner" />;
    },
    dataIndex: "miner",
    width: 280,
    render: value => {
      return (
        <div style={{ width: 280 }}>
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
      return <FormattedHTMLMessage id="table.tx.uncleBlock" />;
    },
    dataIndex: "uncles",
    width: 134,
    render(v) {
      return v.length;
    }
  },

  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.fuelLimit" />;
    },
    dataIndex: "gasLimit",
    width: 140,
    render(h) {
      return <Statistic value={h} />;
    }
  }
  // {
  //   title: () => {
  //     return <FormattedHTMLMessage id="table.tx.reward" />;
  //   },
  //   dataIndex: "reward",
  //   width: 83
  // }
];

// 首页最新交易
const latestTransitionColumns = [
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.hash" />;
    },
    dataIndex: "hash",
    width: 256,
    render: value => (
      <div style={{ width: 256 }}>
        <Link href={{ pathname: "/search", query: { q: value } }}>
          <a className="ellipsis">
            <Tooltip title={value} placement="topLeft">
              <span>{value}</span>
            </Tooltip>
          </a>
        </Link>
      </div>
    )
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.block" />;
    },
    dataIndex: "blockNumber",
    width: 100,
    render: value => (
      <div style={{ width: 100 }}>
        <Link href={{ pathname: "/search", query: { q: value } }}>
          <a className="ellipsis">{value}</a>
        </Link>
      </div>
    )
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.send" />;
    },
    dataIndex: "from",
    width: 256,
    render: value => (
      <div style={{ width: 256 }}>
        <Link href={{ pathname: "/search", query: { q: value } }}>
          <a className="ellipsis">
            <Tooltip title={value} placement="topLeft">
              <span>{value}</span>
            </Tooltip>
          </a>
        </Link>
      </div>
    )
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.receiver" />;
    },
    dataIndex: "to",
    width: 256,
    render: value => (
      <div style={{ width: 256 }}>
        <Link href={{ pathname: "/search", query: { q: value } }}>
          <a className="ellipsis">
            <Tooltip title={value} placement="topLeft">
              <span>{value}</span>
            </Tooltip>
          </a>
        </Link>
      </div>
    )
  },
  {
    title: () => {
      return <FormattedHTMLMessage id="table.tx.transactionsNum" />;
    },
    dataIndex: "value",
    width: 150,
    render: value => <Statistic value={value} precision={3} />
  }
];

const rankingColumn = [
  {
    title: "ID",
    dataIndex: "index"
  },
  {
    title: "地址",
    dataIndex: "address",
    render: value => {
      return (
        <div>
          <Link href={{ pathname: "/search", query: { q: value } }}>
            <a className="ellipsis">
              <span>{value}</span>
            </a>
          </Link>
        </div>
      );
    }
  }
];

export { blockCloumn, latestTransitionColumns, rankingColumn };
