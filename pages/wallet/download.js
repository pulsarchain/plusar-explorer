// h5钱包下载页面
import { useEffect, useState } from "react";
import BlankLayout from "@/layouts/BlankLayout";
import styles from "@/assets/h5download.less";
import Btnbg from "@/assets/img/btn_bg.png";
import Text from "@/assets/img/text.png";
const H5Download = props => {
  const [download, setDownload] = useState("");
  useEffect(() => {
    let ios = `https://testflight.apple.com/join/QS4YdJmr`;
    let android = `https://dwpub.ftpidc.cn/cD1h`;
    let u = navigator.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let url = isIOS ? ios : android;
    setDownload(url);
  }, []);
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <img src={Text} className={styles.text} alt="" />
        <a href={download} className={styles.btnWrap}>
          <img src={Btnbg} alt="" />
          <p>立即下载APP</p>
        </a>
      </div>
    </div>
  );
};

H5Download.Layout = BlankLayout;

export default H5Download;
