import { Card, Descriptions } from "antd";
import { PureComponent } from "react";
import { getTX } from "@/service/plusar";
import SupernodeRecord from "../Record/SuperNode";
import { FormattedHTMLMessage } from "react-intl";

export default class Slot extends PureComponent {
  state = {
    transactions: [],
    total: 0,
    query: { page: 1, pageSize: 20, params: {} },
    loading: false
  };
  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions(payload = {}) {
    const { location } = this.props || {};
    const { params } = location;
    let { query } = this.state;
    query = {
      ...query,
      ...payload,
      params: { addr: params.id, ...query.params, ...payload.params }
    };
    this.setState({ query, loading: true });
    getTX(query)
      .then(({ data, recordsTotal }) => {
        this.setState({ transactions: data, loading: false, total: recordsTotal });
      })
      .catch(() => {
        this.setState({ setState: false });
      });
  }

  render() {
    const { slot = {} } = this.props;
    const { transactions, total, query, loading } = this.state;
    return (
      <>
        <div className="block p0">
          <Card
            title={<FormattedHTMLMessage id="node.title" />}
            bordered={false}
            bodyStyle={{ paddingTop: !slot.addr ? "" : 0 }}
            loading={!slot.addr}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item label={<FormattedHTMLMessage id="node.address" />}>{slot.addr}</Descriptions.Item>
              <Descriptions.Item label={<FormattedHTMLMessage id="node.block.latest" />}>
                {slot.height}
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedHTMLMessage id="node.block.delay" />}>
                {slot.veragedelay}s
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedHTMLMessage id="node.block.success" />}>
                {slot.sucRate}%
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedHTMLMessage id="node.block.avg" />}>
                {slot.verageBlockTx}
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedHTMLMessage id="node.block.size" />}>
                {slot.verageSize}b
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
        <SupernodeRecord
          dataSource={transactions}
          total={total}
          query={query}
          loading={loading}
          onChange={query => this.fetchTransactions(query)}
        />
      </>
    );
  }
}
