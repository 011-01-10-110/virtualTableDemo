import { ref } from 'vue';
import { Column, TablePropsInterface } from '../type';

/**
 * 计算当前元素的父级宽度
 * @param el
 * @returns
 */
export const computedTableWidth = (el: HTMLDivElement) => (el.parentElement as HTMLElement).offsetWidth;

/**
 *
 */
export const scrollWidth = ref<number>(0);
export function getScrollBarSize(feat?: Boolean) {
  if (import.meta.env.SSR) return 0;
  if (feat || !scrollWidth.value) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = '0';
    outerStyle.left = '0';
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    scrollWidth.value = widthContained - widthScroll + 2;
  }
  return scrollWidth.value;
}
/**
 * 处理column的width
 * @param column
 * @param parentWidth
 * @returns
 */
export const columWidthHandler = (column: Column[], parentWidth: number) => {
  if (!scrollWidth.value) getScrollBarSize();
  const allWidth = parentWidth - scrollWidth.value - 6;
  let count = column.length;
  const oneBaseWidth = (allWidth - column.reduce((pre, cur) => {
    if (cur.width) {
      if (typeof cur.width === 'string') {
        count--;
        return pre + Number(cur.width.split('px')[0] ?? 0);
      }
      count--;
      return pre + cur.width;
    }
    return pre;
  }, 0)) / count;
  return column.map((col) => {
    if (!col.width) {
      return `${oneBaseWidth}px`;
    }
    if (typeof col.width !== 'string') {
      return `${col.width.toString()}px`;
    }
    return col.width;
  });
};

export const checkParams = (props: TablePropsInterface) => {
  if (!props.height && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn('virtual类型不传height默认table高为200px');
  }
  if (import.meta.env.DEV && props.scrollType === 'virtual' && !props.virtualOption?.itemHeight) {
    throw new Error('virtual类型的表格需要规定每个item的高');
  }
};

export const throttle = (fn: Function) => {
  let locked = false;
  return (...arg: any[]) => {
    if (!locked) {
      locked = true;
      window.requestAnimationFrame(() => {
        locked = false;
        fn(...arg);
      });
    }
  };
};

export const cloneObj: (P: any) => any = (obj) => {
  if (['string', 'number', 'boolean'].includes(typeof obj) || !obj) {
    return obj;
  } if (obj instanceof Array) {
    return obj.map((i) => cloneObj(i));
  } if (typeof obj === 'object') {
    return Object.keys(obj).reduce((pre, cur) => {
      pre[cur] = cloneObj(obj[cur]);
      return pre;
    }, {} as Record<string, any>);
  }
  return null;
};
