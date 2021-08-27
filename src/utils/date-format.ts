import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
//加载插件
dayjs.extend(utc);
//设置时区
dayjs.extend(timezone);
//获取本地时区
const localTimeZone = dayjs.tz.guess();
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).tz(localTimeZone).format(format);
}
