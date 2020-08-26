import { Popover, Row, Col } from "antd";
import android from "@/assets/img/bosa/android.png";
import mac from "@/assets/img/bosa/wallet_mac.png";
import win from "@/assets/img/bosa/wallet_w.png";
import ios from "@/assets/img/bosa/ios.png";
import QRcode from "@/assets/img/bosa/download.png";
import QRcodeIos from "@/assets/img/bosa/download_ios.png";
import Manual from "@/components/Wallet/manual";
import Ranking from "@/components/Wallet/ranking";
import { FormattedHTMLMessage } from "react-intl";
import { PureComponent } from "react";
import { getPercent, getRanking } from "@/service/plusar";

export default class Wallet extends PureComponent {
  static async getInitialProps({ messages }) {
    const { data } = await getPercent();
    const {
      data: { list }
    } = await getRanking({ page: 1, pageSize: 5 });
    return { list, data, seo: { title: messages["nav.wallet"] } };
  }
  DownLoadQrcode = type => {
    const { messages } = this.props;
    const downloadQrcode = type === "android" ? QRcode : QRcodeIos;
    return (
      <div style={{ width: "330px", textAlign: "center" }}>
        <img src={downloadQrcode} width="120" alt="" />
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            marginTop: "10px",
            wordBreak: "break-word"
          }}
        >
          {type === "android" ? messages.downloadText.android : messages.downloadText.ios}
        </div>
      </div>
    );
  };

  render() {
    const { locale, messages, data, list } = this.props;
    console.log(this.props);
    // const pdf = {
    //   hot: `/static/download/${locale}_TV_HOT.pdf`,
    //   cold: `/static/download/${locale}_TV_COLD.pdf.pdf`
    // };
    return (
      <div className="block">
        <div className="wallet wallet-shadow" style={{ padding: "0px 10px 30px" }}>
          <div className="row noMedia">
            <Row gutter={50} type="flex" justify="center">
              <Col xs={24} sm={24} md={6}>
                <Popover trigger="hover" content={this.DownLoadQrcode("android")} title={null} placement="bottom">
                  <a className="card" href="https://bosha.oss-cn-hongkong.aliyuncs.com/download/app-release.apk" download="pulsar.apk">
                    <img src={android} alt="web" height={45} style={{ marginRight: 16 }} />
                    <FormattedHTMLMessage id="wallet.android" />
                  </a>
                </Popover>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Popover trigger="hover" content={this.DownLoadQrcode("ios")} title={null} placement="bottom">
                  <a className="card card-ios" href="https://testflight.apple.com/join/QS4YdJmr" target="_blank">
                    <img src={ios} alt="web" height={50} style={{ marginRight: 16 }} />
                    <FormattedHTMLMessage id="wallet.ios" />
                  </a>
                </Popover>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <a
                  className="card card-mac"
                  href="https://bosha.oss-cn-hongkong.aliyuncs.com/download/pulsar_mac.dmg"
                  hidefocus="true"
                >
                  <img src={mac} alt="web" height={45} style={{ marginRight: 16 }} />
                  <FormattedHTMLMessage id="wallet.mac" />
                </a>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <a
                  className="card card-win"
                  href="https://bosha.oss-cn-hongkong.aliyuncs.com/download/pulsar_win.zip"
                  hidefocus="true"
                >
                  <img src={win} alt="web" height={50} style={{ marginRight: 16 }} />
                  <FormattedHTMLMessage id="wallet.win" />
                </a>
              </Col>
            </Row>
          </div>
        </div>

        {/* <div className={`${download.wrap} wallet wallet-shadow`}>123123</div> */}
        <Ranking
          data={data}
          list={list}
          title={[messages.ranking, messages.output, messages["table.apply"], messages["billion"]]}
        ></Ranking>
        <Manual messages={messages} />
      </div>
    );
  }
}
