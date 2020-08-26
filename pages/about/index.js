import { FormattedHTMLMessage } from "react-intl";
import { PureComponent } from "react";
import style from "@/assets/connect.less";
import Link from "@/next-router/Link";
import { Row, Col } from "antd";
import about from "@/assets/img/bosa/about.png";
export default class About extends PureComponent {
  static async getInitialProps({ messages }) {
    return { seo: { title: messages["about.title"] } };
  }

  render() {
    return (
      <div className="block white-block">
        <div className="about">
          <div className={`title ${style.eventAboutTitle}`}>
            <Link href="/about">
              <a className="aboutEventTitleActive">
                <FormattedHTMLMessage id="footer.about" />
              </a>
            </Link>
          </div>
          <div className={`${style.about} content`}>
            <Row className={style.bottom}>
              <Col lg={11} xs={24}>
                <img src={about} alt="" />
              </Col>
              <Col lg={{ span: 12, push: 1 }} xs={{ span: 22, pull: 1, push: 1 }} className={style.desc}>
                <div>
                  <span>
                    <FormattedHTMLMessage id="about.desc.first.title" />
                  </span>
                  <span>
                    <FormattedHTMLMessage id="about.desc.first.desc" />
                  </span>
                </div>
                <div>
                  <span>
                    <FormattedHTMLMessage id="about.desc.second.title" />
                  </span>
                  <span>
                    <FormattedHTMLMessage id="about.desc.second.desc" />
                  </span>
                </div>
                <div>
                  <span>
                    <FormattedHTMLMessage id="about.desc.third.title" />
                  </span>
                  <span>
                    <FormattedHTMLMessage id="about.desc.third.desc" />
                  </span>
                </div>

                <div>
                  <span>
                    <FormattedHTMLMessage id="about.desc.fourth.title" />
                  </span>
                  <span>
                    <FormattedHTMLMessage id="about.desc.fourth.desc" />
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
