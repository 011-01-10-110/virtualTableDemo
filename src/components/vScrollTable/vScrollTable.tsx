import {
  computed, defineComponent, ref, toRefs,
} from 'vue';
import vScrollHead from './vScrollHead';
import vScrollBody from './vScrollBody';
import type { TablePropsInterface, VirtualOpInterface } from './type';

import './style/table.css';
import {
  columWidthHandler, computedTableWidth, getScrollBarSize,
} from './composable/utils';
import tableEventListener from './composable/tableEventListener';

export default defineComponent({
  name: 'vScrollTable',
  props: ['data', 'column', 'scrollType', 'height', 'virtualOption'],
  components: {
    vScrollHead,
    vScrollBody,
  },
  setup(props: TablePropsInterface, { slots }) {
    const {
      data, column, scrollType, height, virtualOption,
    } = toRefs(props);
    const type = computed(() => scrollType?.value ?? 'normal');
    data.value.forEach((row, index) => {
      // eslint-disable-next-line no-underscore-dangle
      row._id = index;
      if (type.value === 'virtual') {
        row.translate = index * (virtualOption?.value?.itemHeight || 60);
      }
    });
    column.value.forEach((row, index) => {
      // eslint-disable-next-line no-underscore-dangle
      row._id = index;
    });
    const tableWrapHeight = computed(() => {
      if (type.value !== 'normal') {
        return height?.value ? `${height?.value}px` : '';
      }
      return '';
    });

    const tableWrapRef = ref<HTMLDivElement| null>(null);
    const tableRef = ref<HTMLDivElement| null>(null);
    const tableHeaderRef = ref<HTMLDivElement| null>(null);
    const columnWidth = ref<string[]>([]);

    const init = (feat?: Boolean) => {
      if (feat) {
        getScrollBarSize(true);
      }
      const tableWidth = computedTableWidth(tableWrapRef.value as HTMLDivElement);
      columnWidth.value = columWidthHandler(column.value, tableWidth);
    };
    const {
      showColumns, virtualScrollBarHeight, translateY,
    } = tableEventListener({
      init,
      table: tableRef,
      tableWrap: tableWrapRef,
      tableHeader: tableHeaderRef,
      columns: data,
      type: type.value,
      virtualOption: virtualOption?.value as VirtualOpInterface,
    });

    return () => (
      <div class={{ 'v-scroll-table-wrap': true, [`v-scroll-table-${type?.value}-wrap`]: true }} ref={tableWrapRef} style={{ height: tableWrapHeight.value }}>
        {/* {
          type.value !== 'normal'
            ? <div ref={scrollBarRef} class="v-scroll-vertical-warp">
              <div class="v-scroll-vertical" style={{ height: virtualScrollBarHeight.value }}></div>
            </div>
            : ''
        } */}
        <div class="v-scroll-table" ref={tableRef}>
          <vScrollHead ref={tableHeaderRef} column={column.value} columnWidth={columnWidth.value} />
          <vScrollBody
            translateY={translateY}
            style={{ height: virtualScrollBarHeight.value }}
            column={column}
            data={showColumns}
            rowSlots={slots}
            columnWidth={columnWidth}
            itemHeight={virtualOption?.value?.itemHeight}
            type={type} />
        </div>
      </div>
    );
  },
});
