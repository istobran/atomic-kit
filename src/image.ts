/**
 * 执行图片加载
 * @param     url     图片地址
 * @return            图片加载的 promise
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const loadedFn = function (this: HTMLImageElement) {
      this.width = img.naturalWidth;
      this.height = img.naturalHeight;
      img.removeEventListener('load', loadedFn);
      resolve(img);
    };
    const errorFn = (err: unknown) => {
      img.removeEventListener('error', errorFn);
      reject(err);
    };
    img.addEventListener('load', loadedFn);
    img.addEventListener('error', errorFn);
    img.src = url;
  });
}
