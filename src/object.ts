import { isObjectLike, isNull, keys } from 'lodash-es';

/**
 * 只更新现有对象里面已经有的字段
 * @param   target        现有对象
 * @param   source        新的数据对象
 * @param   ignoreNull    是否忽略 null 赋值
 * @return
 */
export function updateObject<T = object>(target: T, source: object, ignoreNull = false) {
  if (isObjectLike(target) && isObjectLike(source)) {
    keys(target).forEach(key => {
      const ignoreNullAssign = ignoreNull ? source[key as keyof typeof source] !== null : true;
      if (source[key as keyof typeof source] !== undefined && ignoreNullAssign) {
        target[key as keyof typeof target] = source[key as keyof typeof source];
      }
    });
  }
  return target;
}

/**
 * 当后端返回的对象字段值为 null 时，替换为默认数据
 * @param   target    后端返回的对象
 * @param   defaults  包含默认字段的对象
 * @return
 */
export function defaultsNull<T = object>(target: T, defaults: Partial<T>) {
  keys(target).forEach(key => {
    if (isNull(target[key as keyof typeof target]) && defaults[key as keyof typeof defaults]) {
      target[key as keyof typeof target] = defaults[key as keyof typeof defaults]!;
    }
  });
  return target;
}

/**
 * 把对象中值为 undefined 的字段给去掉
 * @param source
 */
export function ignoreUndefined<T extends Record<string, unknown>>(source: T) {
  return Object.keys(source).reduce((newObj, key) => {
    if (typeof source[key] === 'undefined') return newObj;
    newObj[key as keyof T] = source[key] as T[keyof T];
    return newObj;
  }, {} as T)
}
