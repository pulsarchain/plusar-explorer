import { Card } from "antd";

function WrapperSearch({ title, children }) {
  return (
    <div className="block p0">
      <Card bordered={false} bodyStyle={{ paddingTop: 0 }} title={title}>
        {children}
      </Card>
    </div>
  );
}
export default WrapperSearch;
