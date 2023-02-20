import type {
  VNode, h, Ref, Slot,
} from 'vue';

export interface Column {
  title: string | VNode,
  key?: string,
  render?: (H: typeof h, P: Record<string, any>) => VNode
  align?: 'center' | 'right' | 'left',
  width?: string | number,
  slot?: string
  _id?: number
}

export interface VirtualOpInterface {
  itemHeight: number
}

// eslint-disable-next-line no-shadow
export enum ScrollEnum {
  normal = 1,
  fiexd = 2,
  virtual = 3
}

export interface TablePropsInterface {
  data: Array<Record<string, any>>,
  column: Column[],
  scrollType?: keyof typeof ScrollEnum
  virtualOption?: VirtualOpInterface
  height?: number
}

export interface ListenerInterface {
  init: Function
  // scrollBar: Ref<HTMLDivElement|null>
  table: Ref<HTMLDivElement|null>
  tableWrap: Ref<HTMLDivElement|null>
  tableHeader: Ref<HTMLDivElement|null>
  columns: Ref<Array<Record<string, any>>>
  type: 'normal' | 'fiexd' | 'virtual'
  virtualOption: VirtualOpInterface
}

export interface TableBodyPropsInterface {
  data: Record<string, any>[]
  column: Column[]
  rowSlots: Record<string, Slot>
  columnWidth: string[]
  itemHeight: number
  type: 'normal' | 'fiexd' | 'virtual'
  translateY: number
}

export interface TableHeaderPropsInterface {
  column: Column[],
  columnWidth: string[]
}
