import { PureComponent } from "react";
import TXRecord from "@/components/Record";
import { getTransactions } from "@/service/plusar";

export default class Transactions extends PureComponent {
  static async getInitialProps({ messages }) {
    const query = { page: 1, pageSize: 25 };
    const TXData = await getTransactions(query);
    return { TXData, query, seo: { title: messages["nav.transactions"] } };
  }
  constructor(props) {
    super(props);
    const { TXData = {}, query } = props;
    this.state = { TXData, query, loading: false };
  }
  fetch(payload) {
    const query = { ...this.state.query, ...payload };
    this.setState({ query, loading: true });
    getTransactions({ page: query.page, size: query.pageSize })
      .then(TXData => {
        this.setState({ TXData, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { TXData, query, loading } = this.state;
    TXData.data = TXData.data.sort((a, b) => b.timestamp - a.timestamp);
    return (
      <TXRecord
        columns={null}
        dataSource={TXData.data}
        query={query}
        total={TXData.total}
        loading={loading}
        onChange={payload => this.fetch(payload)}
      />
    );
  }
}
