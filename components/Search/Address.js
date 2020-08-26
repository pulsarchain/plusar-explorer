import WrapperSearch from "./Wrapper";
import { Descriptions, Statistic } from "antd";
import { PureComponent } from "react";
import { FormattedHTMLMessage } from "react-intl";
import TXRecord from "../Record";
import { getTransactions } from "@/service/plusar";
import Copy from "../Copy";
export default class SearchAddress extends PureComponent {
  state = { records: [], query: { page: 1, pageSize: 25, startTime: "", endTime: "" }, total: 0, loading: false };

  componentDidMount() {
    this.fetch(this.state.query);
  }

  fetch(payload) {
    const { dataSource = {} } = this.props;
    const params = { key: dataSource.address };
    const query = { ...this.state.query, ...params, ...payload };
    this.setState({ query, loading: true });
    getTransactions({
      ...query,
      size: query.pageSize
    })
      .then(({ data, total }) => {
        this.setState({ records: data, total: total, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { records, query, total, loading } = this.state;
    const { dataSource, locale } = this.props;
    return (
      <>
        <WrapperSearch
          title={
            <span>
              <FormattedHTMLMessage id="search.info.header.address" />
            </span>
          }
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label={<FormattedHTMLMessage id="search.info.address" />}>
              {dataSource.address}
              <Copy text={dataSource.address} />
            </Descriptions.Item>

            <Descriptions.Item label={<FormattedHTMLMessage id="search.info.balance.available" />}>
              <Statistic value={dataSource.balance} />
            </Descriptions.Item>

            <Descriptions.Item label={<FormattedHTMLMessage id="search.info.addressTransitionCount" />}>
              <Statistic value={dataSource.transactionCount} />
            </Descriptions.Item>

            <Descriptions.Item label={<FormattedHTMLMessage id="search.info.code" />}>
              <Statistic value={dataSource.code} />
            </Descriptions.Item>
          </Descriptions>
        </WrapperSearch>

        <TXRecord
          extraContent="time"
          dataSource={records}
          columns={null}
          query={query}
          total={total}
          loading={loading}
          locale={locale}
          onChange={payload => {
            this.fetch(payload);
          }}
        />
      </>
    );
  }
}
