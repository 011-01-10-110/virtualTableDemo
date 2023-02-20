<template>
  <vScrollTable :data="data" :column="column" scroll-type="virtual" :virtual-option="{ itemHeight: 60 }">
    <template #st="{row}">
      <div>{{ row.a + 'qwe' + row._id }}</div>
    </template>
  </vScrollTable>

</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import vScrollTable from '@/components/vScrollTable/vScrollTable';
import type { Column } from '@/components/vScrollTable/type';

const data = reactive([
  { a: 1, b: 2, c: 3 },
  { a: 2, b: 2, c: 3 },
  { a: 3, b: 2, c: 3 },
  { a: 4, b: 2, c: 3 },
  { a: 5, b: 2, c: 3 },
  { a: 6, b: 2, c: 3 },
  { a: 7, b: 2, c: 3 },
  { a: 8, b: 2, c: 3 },
  { a: 9, b: 2, c: 3 },
  { a: 10, b: 2, c: 3 },
  { a: 11, b: 2, c: 3 },
  { a: 12, b: 2, c: 3 },
  { a: 13, b: 2, c: 3 },
  { a: 14, b: 2, c: 3 },
  { a: 15, b: 2, c: 3 },
  { a: 16, b: 2, c: 3 },
  { a: 17, b: 2, c: 3 },
  { a: 18, b: 2, c: 3 },
  { a: 19, b: 2, c: 3 },
  { a: 20, b: 2, c: 3 },
  { a: 21, b: 2, c: 3 },
  { a: 22, b: 2, c: 3 },
  { a: 23, b: 2, c: 3 },
  { a: 24, b: 2, c: 3 },
  { a: 25, b: 2, c: 3 },
  { a: 26, b: 2, c: 3 },
  { a: 27, b: 2, c: 3 },
  { a: 28, b: 2, c: 3 },
]);
const column = reactive<Column[]>([
  {
    title: 'title1', key: 'a', slot: 'st', width: 120,
  },
  { title: 'title2', align: 'center', render: (h, { row }) => h('div', `${row.b}qweasd`) },
  { title: 'title3', key: 'c' },
]);
</script>
