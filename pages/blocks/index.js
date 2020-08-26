import { PureComponent } from "react";
import TXRecord from "@/components/Record";
import { getBlocks } from "@/service/plusar";
import { blockCloumn } from "@/utils/column";
import { FormattedHTMLMessage } from "react-intl";

export default class SuperNode extends PureComponent {
  static async getInitialProps({ messages }) {
    const { data: slots, total } = await getBlocks();
    return { slots, total, seo: { title: messages["nav.node"] } };
  }

  constructor(props) {
    super(props);
    this.state = {
      block: {},
      slots: props.slots,
      total: props.total,
      query: { page: 1, pageSize: 25 },
      loading: false
    };
  }

  fetch = async query => {
    try {
      this.setState({ ...this.state, loading: true });
      const { data: slots } = await getBlocks({
        page: query.page
      });
      this.setState({
        ...this.state,
        query,
        slots,
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
          dataSource={slots}
          columns={blockCloumn}
          total={total}
          loading={loading}
          query={query}
          onChange={this.fetch}
          title={<FormattedHTMLMessage id="table.blocks.title" />}
        />
      </div>
    );
  }
}
