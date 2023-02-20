import {
  defineComponent, toRefs, h, computed,
} from 'vue';
import { Column, TableBodyPropsInterface } from './type';

export default defineComponent({
  name: 'vScrollBody',
  props: ['data', 'column', 'rowSlots', 'columnWidth', 'itemHeight', 'type', 'translateY'],
  setup(props: TableBodyPropsInterface) {
    const {
      data, column, rowSlots, columnWidth, itemHeight, type, translateY,
    } = toRefs(props);
    const isVirtual = computed(() => type.value === 'virtual');

    const rowRender = (td: Column, row: Record<string, any>, index: number) => {
      if (td.slot) {
        return rowSlots.value[td.slot]({ row, index });
      } if (td.render) {
        return td.render(h, { row, index });
      }
      return row[td.key as string];
    };

    return () => (
      <div class="v-scroll-table-body-wrap">
        <table class="v-scroll-table-body" style={{ transform: `translateY(${translateY.value}px)` }}>
          <colgroup>
            {columnWidth.value.map((width) => <col width={width} />)}
          </colgroup>
          <tbody>
            {
              data.value.map((row, index) => (
                // eslint-disable-next-line no-underscore-dangle
                <tr class={`column-${row._id}`} key={row._id}>
                  {
                    column.value.map((td) => (
                      <td
                        // eslint-disable-next-line no-underscore-dangle
                        key={td._id}
                        class={{
                          'align-left': td.align === 'left',
                          'align-right': td.align === 'right',
                          'align-center': td.align === 'center',
                        }}
                        style={[`height: ${isVirtual.value ? itemHeight.value : ''}px`]}
                        rowspan={1}
                        colspan={1}
                      >
                        {
                          rowRender(td, row, index)
                        }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  },
});
