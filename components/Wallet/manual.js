import p1 from "@/assets/img/download/pic_lc1@2x.png";
import p2 from "@/assets/img/download/pic_lc2@2x.png";
import p3 from "@/assets/img/download/pic_lc3@2x.png";
import p4 from "@/assets/img/download/pic_lc4@2x.png";
import p5 from "@/assets/img/download/pic_lc5@2x.png";
import p6 from "@/assets/img/download/pic_lc6@2x.png";
import p7 from "@/assets/img/download/pic_lc7@2x.png";
import p8 from "@/assets/img/download/pic_lc8@2x.png";
import p9 from "@/assets/img/download/pic_lc9@2x.png";
import p10 from "@/assets/img/download/pic_lc10@2x.png";
import p11 from "@/assets/img/download/pic_lc11@2x.png";
import p12 from "@/assets/img/download/pic_lc12@2x.png";
import p13 from "@/assets/img/download/pic_lc13@2x.png";
import p14 from "@/assets/img/download/pic_lc14@2x.png";
import p15 from "@/assets/img/download/pic_lc15@2x.png";
import p16 from "@/assets/img/download/pic_lc16@2x.png";
import p17 from "@/assets/img/download/pic_lc17@2x.png";
import p18 from "@/assets/img/download/pic_lc18@2x.png";
import jt from "@/assets/img/download/icon_jt@2x.png";
import download from "@/assets/download.less";
export default ({ messages }) => (
  <div className={` wallet wallet-shadow ${download.wrap}`}>
    <h4 className={download.title}>创建数字身份操作流程</h4>
    <div className={download.stepTitle}>
      <span>1</span>下载APP创建数字身份
    </div>

    <div className={download.twoImage}>
      <div className={download.imgAndText}>
        <img src={p1} width="226px" alt="" />
        <div>{messages.downloadTextArray[0]}</div>
      </div>
      <img src={jt} className={download.jt} alt="" />
      <div className={download.imgAndText}>
        <img src={p2} width="226px" alt="" />
        <div>进入首页，点击创建数字身份</div>
      </div>
    </div>

    <div className={download.stepTitle}>
      <span>2</span>备份设置PIN码
    </div>
    <div className={download.threeImgWrap}>
      <img src={p3} width="226px" alt="" />
      <img src={jt} className={download.jt} height="12px" alt="" />
      <img src={p4} width="226px" alt="" />
      <img src={jt} className={download.jt} height="12px" alt="" />
      <img src={p5} width="226px" alt="" />
    </div>
    <div className={download.stepTitle}>
      <span>3</span>验证助记词
    </div>
    <div className={download.threeImgWrap}>
      <img src={p6} width="226px" alt="" />
      <img src={jt} className={download.jt} height="12px" alt="" />
      <img src={p7} width="226px" alt="" />
      <img src={jt} className={download.jt} height="12px" alt="" />
      <img src={p8} width="226px" alt="" />
    </div>

    <div className={download.stepTitle}>
      <span>4</span>完成数字身份创建
    </div>

    <div className={download.twoImage}>
      <div className={download.imgAndText}>
        <img src={p9} width="226px" alt="" />
        <div>设置昵称及头像</div>
      </div>
      <img src={jt} className={download.jt} alt="" />
      <div className={download.imgAndText}>
        <img src={p10} width="226px" alt="" />
        <div>设置完成跳转到首页</div>
      </div>
    </div>

    <h4 className={download.title}>谷歌验证操作流程</h4>
    <div className={download.stepTitle}>
      <span>1</span>下载谷歌身份验证器
    </div>
    <div className={download.twoImage}>
      <div className={download.imgAndText}>
        <img src={p11} width="226px" alt="" />
        <div>进入我的页面，点击数字身份</div>
      </div>
      <img src={jt} className={download.jt} alt="" />
      <div className={download.imgAndText}>
        <img src={p12} width="226px" alt="" />
        <div>点击谷歌身份验证器</div>
      </div>
    </div>

    <div className={download.twoImage}>
      <div className={download.imgAndText}>
        <img src={p13} width="226px" alt="" />
        <div>点击红色字体复制应用名称</div>
      </div>
      <img src={jt} className={download.jt} alt="" />
      <div className={download.imgAndText}>
        <img src={p14} width="226px" alt="" />
        <div>粘贴应用名称进行下载</div>
      </div>
    </div>

    <div className={download.stepTitle}>
      <span>2</span>绑定谷歌验证码
    </div>

    <div className={download.twoImage}>
      <div className={download.imgAndText}>
        <img src={p15} width="226px" alt="" />
        <div>打开谷歌身份验证器,添加账号点击输入提供的密匙</div>
      </div>
      <img src={jt} className={download.jt} alt="" />
      <div className={download.imgAndText}>
        <img src={p16} width="226px" alt="" />
        <div>输入账号名，在Pusar APP绑定谷歌验证页面复制密匙粘贴到本页面进行添加</div>
      </div>
    </div>
    <div className={download.twoImage}>
      <div className={download.imgAndText}>
        <img src={p17} width="226px" alt="" />
        <div>添加成功点击验证码进行复制</div>
      </div>
      <img src={jt} className={download.jt} alt="" />
      <div className={download.imgAndText}>
        <img src={p18} width="226px" alt="" />
        <div>打开Pusar APP绑定谷歌验证页面粘贴谷歌验证码，点击确定绑定成功</div>
      </div>
    </div>
  </div>
);
