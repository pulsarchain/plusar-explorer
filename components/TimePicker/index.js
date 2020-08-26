import { DatePicker, Button } from "antd";
import { FormattedHTMLMessage } from "react-intl";
import moment from "moment";
import "moment/locale/zh-cn";
const language = {
  "zh-CN": {
    lang: {
      backToToday: "返回今天",
      clear: "清除",
      dateFormat: "YYYY年M月D日",
      dateSelect: "选择日期",
      dateTimeFormat: "YYYY年M月D日 HH时mm分ss秒",
      dayFormat: "D日",
      decadeSelect: "选择年代",
      month: "月",
      monthSelect: "选择月份",
      nextCentury: "下一世纪",
      nextDecade: "下一年代",
      nextMonth: "下个月 (翻页下键)",
      nextYear: "下一年 (Control键加右方向键)",
      now: "此刻",
      ok: "确 定",
      placeholder: "请选择日期",
      previousCentury: "上一世纪",
      previousDecade: "上一年代",
      previousMonth: "上个月 (翻页上键)",
      previousYear: "上一年 (Control键加左方向键)",
      rangePlaceholder: ["开始日期", "结束日期"],
      timeSelect: "选择时间",
      today: "今天",
      weekSelect: "选择周",
      year: "年",
      yearFormat: "YYYY年",
      yearSelect: "选择年份"
    },
    timePickerLocale: {
      placeholder: "请选择时间"
    }
  },
  "en-US": {
    lang: {
      backToToday: "Back to today",
      clear: "Clear",
      dateFormat: "M/D/YYYY",
      dateSelect: "select date",
      dateTimeFormat: "M/D/YYYY HH:mm:ss",
      dayFormat: "D",
      decadeSelect: "Choose a decade",
      month: "Month",
      monthBeforeYear: true,
      monthSelect: "Choose a month",
      nextCentury: "Next century",
      nextDecade: "Next decade",
      nextMonth: "Next month (PageDown)",
      nextYear: "Next year (Control + right)",
      now: "Now",
      ok: "Ok",
      placeholder: "Select date",
      previousCentury: "Last century",
      previousDecade: "Last decade",
      previousMonth: "Previous month (PageUp)",
      previousYear: "Last year (Control + left)",
      rangePlaceholder: ["Start date", "End date"],
      timeSelect: "select time",
      today: "Today",
      weekSelect: "Choose a week",
      year: "Year",
      yearFormat: "YYYY",
      yearSelect: "Choose a year"
    },
    timePickerLocale: {
      placeholder: "Select time"
    }
  }
};
const { RangePicker } = DatePicker;
let startTime = "";
let endTime = "";
export default ({ onChange, locale, k }) => {
  moment.locale(locale);
  const change = value => {
    if (!value.length) {
      onChange([]);
      startTime = "";
      endTime = "";
    } else {
      startTime = moment(value[0]).valueOf();
      endTime = moment(value[1]).valueOf();
    }
  };
  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }
  function exportXlsx(startTime, endTime) {
    let base = `${process.env.baseURL}/api/v1/transactions/transitionRecord`;
    let url = `${base}?key=${k}&startTime=${startTime}&endTime=${endTime}&language=${locale}`;
    window.location.href = url;
  }
  return (
    <div>
      <RangePicker
        showTime
        disabledDate={disabledDate}
        locale={language[locale]}
        onOk={onChange}
        onChange={change}
        format="YYYY-MM-DD HH:mm:ss"
      />{" "}
      <Button
        type="primary"
        onClick={() => {
          console.log(startTime, endTime);
          exportXlsx(startTime, endTime);
        }}
      >
        <FormattedHTMLMessage id="search.export" />
      </Button>{" "}
    </div>
  );
};
