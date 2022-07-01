import { padStart, isDate } from 'lodash-es';

/**
 * 延迟一定时间（默认timeout为0，表示延迟一个macrotask）
 * @param timeout   需要延迟的毫秒数
 */
export function delay(timeout = 0) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * 不足两位的数组前面补个 0
 * @param num
 */
export function padZero(num: number) {
  return padStart(String(Math.floor(num)), 2, '0');
}

/**
 * 时间差转换为时分秒倒计时
 * 最终会输出 124:22:11 这样的时分秒格式
 * @param startTime   起始时间
 * @param endTime     终止时间
 */
export function toRemainTime(startTime: Date | number | string, endTime: Date | number | string) {
  const start = isDate(startTime) ? startTime as Date : new Date(startTime);
  const end = isDate(endTime) ? endTime as Date : new Date(endTime);
  const remain = Math.max(0, end.getTime() - start.getTime());
  const seconds = remain / 1e3;
  const hour = padZero(seconds / 3600);
  const minute = padZero(seconds / 60 % 60);
  const second = padZero(seconds % 60);
  const text = `${hour}:${minute}:${second}`;
  return { remain, text, hour, minute, second };
}
