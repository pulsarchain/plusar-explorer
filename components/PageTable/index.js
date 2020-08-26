import { Table, Row, Typography } from "antd";
import TimePicker from "@/components/TimePicker";
import { FormattedHTMLMessage } from "react-intl";
import moment from "moment";
const { Title } = Typography;

export default ({
  dataSource = [],
  columns = [],
  query = {},
  total = 0,
  onChange,
  extraContent,
  title,
  wrapStyle,
  locale,
  ...resetProps
}) => {
  const handleTimeChange = value => {
    let timeParams = {
      startTime: value.length ? moment(value[0]).valueOf() : "",
      endTime: value.length ? moment(value[1]).valueOf() : ""
    };
    onChange && onChange({ ...query, ...timeParams, page: 1 });
  };

  const handlePageChange = (page, pageSize) => {
    onChange && onChange({ ...query, page, pageSize });
  };

  return (
    <div className="block p0" style={wrapStyle}>
      <Table
        dataSource={dataSource}
        columns={columns}
        // locale={{ emptyText: "暂无相关数据" }}
        pagination={{
          current: query.page,
          pageSize: query.pageSize,
          total,
          hideOnSinglePage: true,
          onChange: handlePageChange,
          showTotal: (total, range) => {
            return (
              <FormattedHTMLMessage id="table.pagination.total" values={{ start: range[0], end: range[1], total }} />
            );
          }
        }}
        scroll={{ x: "max-content" }}
        title={() => {
          return (
            <Row type="flex" justify="space-between">
              <Title level={4}>{title}</Title>
              {extraContent === "time" ? (
                <TimePicker locale={locale} onChange={handleTimeChange} k={query.key} />
              ) : (
                extraContent
              )}
            </Row>
          );
        }}
        {...resetProps}
      />
    </div>
  );
};
