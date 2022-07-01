// 常用的 filter 函数
import { isNumber } from 'lodash-es';
import { moment } from './timer';

/**
 * 日期格式化（YYYY-MM-DD）
 * @param {number}  timeStamp   待格式化的时间戳
 */
export function date(timeStamp: number) {
  return isNumber(timeStamp)
    ? moment(timeStamp).format('YYYY-MM-DD')
    : '';
}

/**
 * 中文日期格式化（YYYY 年 MM 月 DD 日）
 * @param   timeStamp   待格式化的时间戳
 */
export function chsDate(timeStamp: number) {
  return isNumber(timeStamp)
    ? moment(timeStamp).format('YYYY 年 MM 月 DD 日')
    : '';
}

/**
 * 日期时间格式化（YYYY-MM-DD HH:mm:ss）
 * @param   timeStamp   待格式化的时间戳
 */
export function dateTime(timeStamp: number) {
  return isNumber(timeStamp)
    ? moment(timeStamp).format('YYYY-MM-DD HH:mm:ss')
    : '';
}

/**
 * 百分比格式化（例：0.123 会转成 12.30%）
 * @param     value   0 到 1 之间的小数
 */
export function percent(value: number) {
  return isNumber(value)
    ? `${(value * 100).toFixed(2)}%`
    : '';
}

/**
 * 内部价格数字转换函数
 * @param     value   待处理的价格
 */
export function formatPrice(value: number) {
  const num = Math.abs(value).toFixed(2).toString().split('.');
  num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num.join('.');
}

/**
 * 价格格式化（例：-1234.1 会变成 -¥1,234.10）
 * 使用半角人民币符号，不是全角的
 * 详见：https://zhuanlan.zhihu.com/p/54219678
 * @param     value   待处理的价格
 */
export function price(value?: number | string) {
  let val = value;
  if (typeof value === 'string') {
    val = Number(value)
  }
  if (typeof val !== 'number' || isNaN(val)) {
    return '';
  }
  return val >= 0
    ? `¥${formatPrice(val)}`
    : `-¥${formatPrice(val)}`;
}

/**
 * 数量格式化 （例：-1234.1 会变成 -1,234）
 * @param num  数量值
 */
export function amount(num?: number | string | null) {
  let val = num;
  if (typeof val === 'string') {
    val = val.replace(/[^\d+-\.]/g, ''); // 删掉非数字字符
  }
  val = parseInt(String(val), 10); // 去除小数部分
  if (isNaN(val)) return ''; // undefined 和 空字符串都会变成 NaN，所以这里只要判断NaN就好啦
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
