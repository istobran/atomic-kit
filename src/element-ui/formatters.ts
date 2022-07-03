// 饿了么组件库的表格列的常用格式化函数
import { date, dateTime, percent, price } from '../filters';
import { rearg } from 'lodash-es';

export type Formatter<T> = (row: object, column: any, cellValue: T) => string;

/**
 * 日期格式化
 * @param row         表格行数据
 * @param column      表格列数据
 * @param timeStamp   待格式化的时间戳
 */
export const dateFormat: Formatter<number> = rearg(date, 2);

/**
 * 日期时间格式化
 * @param row         表格行数据
 * @param column      表格列数据
 * @param timeStamp   待格式化的时间戳
 */
export const dateTimeFormat: Formatter<number> = rearg(dateTime, 2);

/**
 * 百分比格式化
 * @param row         表格行数据
 * @param column      表格列数据
 * @param cellValue   0 到 1 之间的小数
 */
export const percentFormat: Formatter<number> = rearg(percent, 2);

/**
 * 价格格式化
 * @param row         表格行数据
 * @param column      表格列数据
 * @param cellValue   价格
 */
export const priceFormat: Formatter<number> = rearg(price, 2);
