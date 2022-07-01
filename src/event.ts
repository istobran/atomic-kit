export type EventHandler = (...args: any[]) => void;
export const internalEventHub: Record<string, EventHandler[]> = {};

/**
 * 添加全局事件监听（支持nodejs）
 * @param event   事件名称
 * @param handler 事件处理函数
 */
export function addListener(event: string, handler: EventHandler): void {
  internalEventHub[event] = internalEventHub[event] || [];
  internalEventHub[event].push(handler);
}

/**
 * 移除全局事件监听（支持nodejs）
 * @param event   事件名称
 * @param handler 事件处理函数
 */
export function removeListener(event: string, handler?: EventHandler): void {
  if (internalEventHub[event]) {
    if (handler) {
      const index = internalEventHub[event].indexOf(handler);
      if (index > -1) {
        internalEventHub[event].splice(index, 1);
      }
    } else {
      internalEventHub[event] = [];
    }
  }
}

/**
 * 触发全局事件（支持nodejs）
 * @param event  事件名称
 * @param data   事件参数
 */
export function dispatchEvent(event: string, data?: any): void {
  if (internalEventHub[event]) {
    internalEventHub[event].forEach(handler => {
      handler(data);
    });
  }
}

/**
 * 清空全局事件监听（支持nodejs）
 */
export function clearListener(): void {
  Object.keys(internalEventHub).forEach(key => {
    internalEventHub[key] = [];
  });
}
