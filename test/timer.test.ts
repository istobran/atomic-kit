import { delay, toRemainTime } from '@/timer';

describe('delay 延迟函数', () => {
  test('不传参数时代码应该也能生效', async () => {
    let check = false;
    await delay();
    check = true;
    expect(check).toBeTruthy();
  });
  test('传了时间之后应该生效', async () => {
    const timeout = 100;
    const before = new Date().getTime();
    await delay(timeout);
    const after = new Date().getTime();
    expect((after - before) >= timeout).toBeTruthy();
  });
});

describe('toRemainTime 时间区间转换为倒计时', () => {
  test('2022-05-19 00:00:00 到 2022-05-30 18:22:22 的时间差应该为 282:22:22（Date 类型）', async () => {
    const startTime = new Date(2022, 4, 19, 0, 0, 0);
    const endTime = new Date(2022, 4, 30, 18, 22, 22);
    expect(toRemainTime(startTime, endTime)).toEqual({
      "remain": 1016542000,
      "text": "282:22:22",
      "hour": "282",
      "minute": "22",
      "second": "22"
    });
  });
  test('2022-05-19 00:00:00 到 2022-05-30 18:22:22 的时间差应该为 282:22:22（number 类型）', async () => {
    const startTime = 1652889600000;
    const endTime = 1653906142000;
    expect(toRemainTime(startTime, endTime)).toEqual({
      "remain": 1016542000,
      "text": "282:22:22",
      "hour": "282",
      "minute": "22",
      "second": "22"
    });
  });
  test('2022-05-19 00:00:00 到 2022-05-30 18:22:22 的时间差应该为 282:22:22（string 类型）', async () => {
    const startTime = '2022-05-18T16:00:00.000Z';
    const endTime = '2022-05-30T10:22:22.000Z';
    expect(toRemainTime(startTime, endTime)).toEqual({
      "remain": 1016542000,
      "text": "282:22:22",
      "hour": "282",
      "minute": "22",
      "second": "22"
    });
  });
  test('倒计时的最小值应该为 0', async () => {
    const startTime = new Date(2022, 4, 19, 0, 0, 0);
    const endTime = new Date(2022, 4, 30, 18, 22, 22);
    expect(toRemainTime(endTime, startTime)).toEqual({
      "remain": 0,
      "text": "00:00:00",
      "hour": "00",
      "minute": "00",
      "second": "00",
    });
  });
});
