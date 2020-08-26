import { PureComponent } from "react";
import TXRecord from "@/components/Record";
import { getRanking } from "@/service/plusar";
import { rankingColumn } from "@/utils/column";
import { FormattedHTMLMessage } from "react-intl";
const query = { page: 1, pageSize: 25 };

const formateData = (data = [], query = { page: 1, pageSize: 25 }) => {
  return data.map((item, index) => ({
    ...item,
    index: (query.page - 1) * query.pageSize + index + 1 + "."
  }));
};
export default class SuperNode extends PureComponent {
  static async getInitialProps({ messages }) {
    const {
      data: { list: slots, total }
    } = await getRanking({
      page: 1,
      pageSize: 25
    });

    return { slots, total, seo: { title: messages["nav.ranking"] } };
  }

  constructor(props) {
    super(props);
    this.state = {
      block: {},
      slots: formateData(props.slots),
      total: props.total,
      query,
      loading: false
    };
  }

  fetch = async query => {
    try {
      this.setState({ ...this.state, loading: true });
      const {
        data: { list: slots }
      } = await getRanking({
        page: query.page,
        pageSize: query.pageSize
      });
      this.setState({
        ...this.state,
        query,
        slots: formateData(slots, query),
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { slots, total, query, loading } = this.state;
    return (
      <div className="transiton-record-wrap">
        <TXRecord
          showHeader={false}
          dataSource={slots}
          columns={rankingColumn}
          total={total}
          loading={loading}
          query={query}
          onChange={this.fetch}
          title={<FormattedHTMLMessage id="table.ranking.title" />}
        />
      </div>
    );
  }
}
