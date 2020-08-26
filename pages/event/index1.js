import { FormattedHTMLMessage } from "react-intl";
import { PureComponent } from "react";
import style from "@/assets/connect.less";
import Link from "@/next-router/Link";
import { Timeline } from "antd";

let dot = <div className={style.dot}></div>;
let dotNull = <div className={style.dotNull}></div>;

export default class About extends PureComponent {
  static async getInitialProps({ messages }) {
    return { seo: { title: messages["footer.event"] } };
  }

  render() {
    const eventList = this.props.messages["footer.event.list"];
    return (
      <div className="block white-block">
        <div className="about">
          <div className={`title ${style.eventAboutTitle}`}>
            <Link href="/about">
              <a>
                <FormattedHTMLMessage id="footer.about" />
              </a>
            </Link>
            <Link href="/event">
              <a className="aboutEventTitleActive">
                <FormattedHTMLMessage id="footer.event" />
              </a>
            </Link>
          </div>
          <div className={`${style.eventContent} content`}>
            <div>
              {eventList.map((item, index) => (
                <div className={style.timeLineWrap} key={index}>
                  <span>{item.time}</span>
                  <Timeline>
                    {item.events.map(data => (
                      <Timeline.Item dot={dot} key={data.time}>
                        <span className={style.time}>{data.time}</span>
                        {data.event}
                      </Timeline.Item>
                    ))}
                    {index + 1 !== eventList.length && (
                      <Timeline.Item dot={dotNull} className={style.lastDot}></Timeline.Item>
                    )}
                  </Timeline>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
