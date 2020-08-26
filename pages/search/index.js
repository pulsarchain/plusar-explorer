import { PureComponent } from "react";
import { search, getSearch } from "@/service/plusar";
import dynamic from "next/dynamic";
import { FormattedHTMLMessage } from "react-intl";

const Error = dynamic(() => import("@/components/Error"));
const SearchTransaction = dynamic(() => import("@/components/Search/Transaction"));
const SearchBlock = dynamic(() => import("@/components/Search/Block"));
const SearchAddress = dynamic(() => import("@/components/Search/Address"));

const Components = {
  empty: () => <Error subTitle={<FormattedHTMLMessage id="search.empty" />} />,
  hashEmpty: () => <Error subTitle={<FormattedHTMLMessage id="search.hashEmpty" />} title={"PENDING"} />,
  BLOCK: props => <SearchBlock {...props} />,
  ADDRESS: props => <SearchAddress {...props} />,
  HASH: props => <SearchTransaction {...props} />
};

const titleKeys = {
  BLOCK: "search.info.header.block",
  ADDRESS: "search.info.header.address",
  HASH: "search.info.header.tx"
};

export default class Search extends PureComponent {
  static async getInitialProps({ location, messages }) {
    const { query } = location;
    const { q } = query;
    let searchType = "";
    let searchData = {};
    let title = undefined;
    // type: 1,4区块，2交易地址数据，3交易ID数据
    const res = q ? await getSearch({ key: q }).catch(() => {}) : undefined;
    if (res) {
      const { data, type } = res;
      searchType = type || "empty";
      searchData = data || {};
      title = type ? messages[titleKeys[type]] : undefined;
    }

    if (q && !res) {
      if (q && q.startsWith("0x") && q.length === 66) {
        searchType = "hashEmpty";
      } else {
        searchType = "empty";
      }
    }
    return { searchType, searchData, seo: { title } };
  }
  constructor(props) {
    super(props);
    const { searchType, searchData } = props;
    this.state = { type: searchType, data: searchData };
  }
  render() {
    const { data, type } = this.state;
    const Component = Components[type];
    return Component ? <Component dataSource={data} locale={this.props.locale} subTitle={"交易正在打包中"} /> : null;
  }
}
