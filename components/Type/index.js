import { FormattedHTMLMessage } from "react-intl";

export const types = {
  1: <FormattedHTMLMessage id="table.tx.type.1" />,
  2: <FormattedHTMLMessage id="table.tx.type.2" />,
  3: <FormattedHTMLMessage id="table.tx.type.3" />,
  4: <FormattedHTMLMessage id="table.tx.type.4" />,
  5: <FormattedHTMLMessage id="table.tx.type.5" />
};

export default ({ type = 1 }) => types[type];
