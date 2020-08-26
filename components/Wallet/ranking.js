import { useEffect, useRef } from "react";
import ranking from "./ranking.less";
import { Row, Col, List } from "antd";
import Link from "@/next-router/Link";
import { getRanking } from "@/service/plusar";
let pieConstructor = null;
if (process.browser) {
  const { Pie } = require("@antv/g2plot");
  pieConstructor = Pie;
}
export default ({ data = { rateInfoList: [] }, title, list }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!process.browser) {
      return;
    } else {
      const piePlot = new pieConstructor(ref.current, {
        forceFit: true,
        radius: 1,
        height: 300,
        data: data.rateInfoList.map(item => {
          if (item.remark === "其他") {
            item.ranking = "其他";
          }
          return item;
        }),
        legend: {
          visible: false
        },
        angleField: "percent",
        colorField: "ranking",
        label: {
          visible: true,
          type: "outer",
          formatter: function(value) {
            return value + "%";
          }
        },
        tooltip: {
          formatter: (value, name) => {
            return {
              name,
              value: `${value}%`
            };
          }
        }
      });

      piePlot.render();
    }
  });
  return (
    <div className={`${ranking.wrap} wallet wallet-shadow`}>
      <Row gutter={[0, 10]}>
        <Col lg={24} xl={14}>
          <h3 className={ranking.title}>
            {title[0]} 5 / {data.totalAccount}
          </h3>
          <List
            split={false}
            dataSource={list.slice(0, 5)}
            renderItem={(item, index) => (
              <List.Item>
                <div>
                  <span className={ranking.label}>{index + 1}.</span>
                  <Link href={{ pathname: "/search", query: { q: item.address } }}>
                    <a>{item.address}</a>
                  </Link>
                </div>
              </List.Item>
            )}
          />
          <div className={ranking.loadMore}>
            <Link href={{ pathname: "/ranking" }}>
              <a>{title[2]}</a>
            </Link>
          </div>
        </Col>
        <Col lg={24} xl={10}>
          <h3>
            {title[1]}：{(data.totalOutput / Math.pow(10, 8)).toFixed(2)}
            {title[3]} / 21.5{title[3]}
          </h3>
          <div id="container" ref={ref}></div>
        </Col>
      </Row>
    </div>
  );
};
