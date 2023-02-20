import {
  onDeactivated, onMounted, ref, computed, watch,
} from 'vue';
import { ListenerInterface } from '../type';
import { throttle } from './utils';

export default ({
  init, columns, type, virtualOption, tableWrap, tableHeader,
}: ListenerInterface) => {
  const isVirtual = computed(() => type === 'virtual');
  const showColumns = ref<Record<string, any>>([]);
  const startRow = ref(0);
  const endRow = ref(0);
  const translateY = ref(0);
  const isShowHeader = ref(true);
  const headerHeight = ref(0);
  const virtualScrollBarHeight = computed(() => `${isVirtual.value ? (virtualOption?.itemHeight as number) * columns.value.length : ''}px`);

  const scrollHandler = (event: Event) => {
    if (!tableWrap.value) {
      return;
    }
    const tableWrapHeight = tableWrap.value.clientHeight;
    const maxLen = Math.floor(tableWrapHeight / virtualOption.itemHeight) + 4;
    const { scrollTop } = event.target as HTMLDivElement;
    const bodyScrollTop = scrollTop - headerHeight.value - virtualOption.itemHeight * 2;
    if (bodyScrollTop > 0) {
      startRow.value = Math.min(Math.floor(bodyScrollTop / virtualOption.itemHeight), columns.value.length - maxLen);
    } else {
      startRow.value = 0;
    }

    if (startRow.value < 2) {
      isShowHeader.value = true;
      translateY.value = 0;
    } else {
      isShowHeader.value = false;
    }
    endRow.value = Math.min(startRow.value + maxLen, columns.value.length);
    if (startRow.value) {
      translateY.value = startRow.value * virtualOption.itemHeight;
    }
  };

  const throttleScroll = throttle(scrollHandler);

  const resizeHandler = () => init(true);

  const columnComputed = () => {
    if (!isVirtual.value || !tableWrap.value) {
      showColumns.value = columns.value;
      return;
    }
    const tableWrapHeight = tableWrap.value.clientHeight;
    const maxLen = Math.floor(tableWrapHeight / virtualOption.itemHeight) + 4;
    endRow.value = maxLen;
  };

  watch([startRow, endRow], async () => {
    if (isVirtual.value) {
      showColumns.value = columns.value.slice(startRow.value, endRow.value);
    }
  });

  onMounted(() => {
    init();
    headerHeight.value = tableHeader?.value?.clientHeight || 0;
    columnComputed();
    window.addEventListener('resize', resizeHandler);
    if (isVirtual.value) {
      tableWrap.value?.addEventListener('scroll', throttleScroll);
    }
  });

  onDeactivated(() => {
    window.removeEventListener('resize', resizeHandler);
    if (isVirtual.value) {
      tableWrap.value?.removeEventListener('scroll', throttleScroll);
    }
  });

  return {
    showColumns,
    startRow,
    endRow,
    virtualScrollBarHeight,
    isShowHeader,
    translateY,
  };
};
