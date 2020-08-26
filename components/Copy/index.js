import ReactClipboard from "react-clipboardjs-copy";
import { Icon, message } from "antd";
import { Component } from "react";

export default class extends Component {
  render() {
    const { text } = this.props;
    return (
      <ReactClipboard
        text={text}
        selection={false}
        onSuccess={() => message.success("复制成功")}
        onError={() => message.error("复制失败")}
      >
        <span style={{ cursor: "pointer", marginLeft: "5px" }}>
          <Icon type="copy" />
        </span>
      </ReactClipboard>
    );
  }
}
