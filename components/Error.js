import { Result, Icon } from 'antd';

export default ({ title = '404', subTitle = 'Sorry, the page you visited does not exist.' }) => (
  <div className="block">
    <Result icon={<Icon type="frown" />} title={title} subTitle={subTitle} />
  </div>
);
