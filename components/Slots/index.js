import { Icon, Tooltip, Statistic } from "antd";
import { FormattedHTMLMessage } from "react-intl";
import Link from "@/next-router/Link";
import PageTable from "../PageTable";
import moment from "moment";

export default ({ dataSource = [], currentHeight, columns, title, href = "/blocks" }) => {
  // dataSource = dataSource.sort((a, b) => a.slotId - b.slotId);
  const initColumns = [
    {
      dataIndex: "number",
      width: 100,
      title: () => {
        return <FormattedHTMLMessage id="table.tx.block" />;
      },
      render: value => {
        return (
          <div>
            <Link href={{ pathname: "/search", query: { q: value } }}>
              <a className="ellipsis">{value}</a>
            </Link>
          </div>
        );
      }
    },
    {
      dataIndex: "hash",
      width: 220,
      title: () => {
        return <FormattedHTMLMessage id="search.info.hash" />;
      },
      render: value => {
        return (
          <div style={{ width: 220 }}>
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
      dataIndex: "difficulty",
      width: 120,
      title: () => {
        return <FormattedHTMLMessage id="search.info.hard" />;
      },
      render: value => {
        return value;
      }
    },
    {
      dataIndex: "miner",
      width: 210,
      title: () => {
        return <FormattedHTMLMessage id="search.info.minerAddress" />;
      },
      render: value => {
        return (
          <div style={{ width: 210 }}>
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
      dataIndex: "sizeUnit",
      title: () => {
        return <FormattedHTMLMessage id="search.info.size" />;
      },
      render: value => {
        return value;
      }
    },
    {
      dataIndex: "timestamp",
      width: 200,
      render: value => {
        return value && moment(value * 1000).format("YYYY-MM-DD HH:mm:ss");
      },
      title: () => {
        return <FormattedHTMLMessage id="table.tx.timestamp" />;
      }
    },
    {
      dataIndex: "transactionCount",
      width: 150,
      render: value => {
        return <Statistic value={value} />;
      },
      title: () => {
        return <FormattedHTMLMessage id="table.tx.transactionsNum" />;
      }
    }
  ];
  return (
    <PageTable
      wrapStyle={{ marginTop: 0 }}
      rowKey="_id"
      dataSource={dataSource}
      columns={columns || initColumns}
      query={{ pageSize: 25 }}
      title={title || <FormattedHTMLMessage id="table.LatestBlock" />}
      extraContent={
        <a href={href} className="table-more">
          <FormattedHTMLMessage id="table.apply" target="_blank" />
        </a>
      }
    />
  );
};
