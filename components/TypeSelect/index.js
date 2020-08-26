import { Form, Select } from 'antd';
import { FormattedHTMLMessage } from 'react-intl';
import { types } from '../Type';

const { Option } = Select;

export default ({ onChange }) => (
  <Form layout="inline" colon={false}>
    <Form.Item label={<FormattedHTMLMessage id="table.tx.type.name" />}>
      <Select
        placeholder={<FormattedHTMLMessage id="table.tx.type.placeholder" />}
        onChange={onChange}
        style={{ width: 140 }}
        dropdownMatchSelectWidth={false}
        allowClear>
        {Object.keys(types).map(key => (
          <Option value={key} key={key}>
            {types[key]}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Form>
);
