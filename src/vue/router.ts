import type Vue from 'vue';
import type VueRouter from 'vue-router';
import { clone, get, pull } from 'lodash-es';

/**
 * 【hack】用手动摧毁 keepAlive 页面组件的方法
 * 参考自：https://juejin.cn/post/6844903649517240328
 * @param vm    Vue 实例组件
 */
export function destroyKeepAlive(vm: Vue) {
  const isKeepAlive = get(vm.$vnode, 'data.keepAlive', false);
  const cache = get(vm.$vnode, 'parent.componentInstance.cache');
  if (isKeepAlive && cache) {
    const tag = get(vm.$vnode, 'componentOptions.tag', '');
    const key = get(vm.$vnode, 'key') as string
      || `${get(vm.$vnode, 'componentOptions.Ctor.cid')}${tag ? `::${tag}` : ''}`;
    const keys = get(vm.$vnode, 'parent.componentInstance.keys');
    if (cache[key]) {
      pull(keys, key);
      delete cache[key];
    }
  }
  vm.$destroy();
}

/**
 * 修改路由查询条件
 * @param     vm        Vue 实例组件
 * @param     q         新的 query 参数
 */
export async function assignQuery(vm: Vue, q: object) {
  const query = clone(vm.$route.query);
  Object.assign(query, q);
  await vm.$router.replace({ query });
}

/**
 * 删除路由查询条件
 * @param     vm        Vue 实例组件
 * @param     keys      待删除的查询参数列表
 */
export async function removeQuery(vm: Vue, keys: string[]) {
  const query = clone(vm.$route.query);
  keys.forEach(k => { delete query[k]; });
  await vm.$router.replace({ query });
}
