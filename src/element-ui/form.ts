/**
 * 对 Element ui 的 dateRange 数组进行拆分
 * endTime 会自动修正为 当天的 23:59:59
 * @param   dateRange    el-date-picker 取到的 dateRange 值
 * @return               包含 startTime 和 endTime 的对象
 */
export function splitDateRange(dateRange: Date[]) {
  if (!dateRange || dateRange.length < 2) return {};
  const [startTime, endTime] = dateRange;
  endTime.setDate(endTime.getDate() + 1);
  return {
    startTime: startTime.getTime(),
    endTime: endTime.getTime() - 1,
  };
}

/**
 * 对 Element ui 的 Address 数组进行拆分
 * @param   {number[]}   addressIDs   el-address 的 addressIDs 数组
 * @return  {object}                  包含省市区乡 id 的对象
 */
export function splitAddressIds(addressIDs: number[]) {
  if (!addressIDs || !addressIDs.length) return {};
  return {
    provinceID: addressIDs[0],
    cityID: addressIDs[1],
    countyID: addressIDs[2],
    townID: addressIDs[3],
  };
}
