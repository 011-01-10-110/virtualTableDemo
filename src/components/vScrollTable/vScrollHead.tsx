import {
  defineComponent, toRefs, ref, onMounted,
} from 'vue';
import { TableHeaderPropsInterface, Column } from './type';

export default defineComponent({
  name: 'vScrollHead',
  props: ['column', 'columnWidth'],
  setup(props: TableHeaderPropsInterface, { expose }) {
    const { column, columnWidth } = toRefs(props);

    const title = ref<Column['title'][]>([]);

    const initTitle = () => {
      title.value = column.value.map((i) => i.title);
    };
    const clientHeight = ref(0);
    const headerRef = ref<HTMLDivElement | null>(null);
    initTitle();

    onMounted(() => {
      clientHeight.value = headerRef.value?.clientHeight as number;
    });

    expose({
      initTitle,
      clientHeight,
    });

    return () => (
      <table class="v-scroll-table-header" ref={headerRef}>
        <colgroup>
          {columnWidth.value.map((width) => <col width={width} />)}
        </colgroup>
        <thead>
          <tr>
              {column.value.map((col, index) => (
                typeof col.title === 'string'
                  ? <th
                      key={index}
                      rowspan={1}
                      colspan={1}
                      class={{
                        'align-left': col.align === 'left',
                        'align-right': col.align === 'right',
                        'align-center': col.align === 'center',
                      }}
                    ><div>{col.title}</div></th>
                  : col.title
              ))}
          </tr>
        </thead>
      </table>
    );
  },
});
