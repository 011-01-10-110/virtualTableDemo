# 虚拟表格Demo

| props | 说明 | 类型 | 默认值 |
| - | - | - | - |
| data | 数据 | Array | - |
| column | 表格配置项 | Array | - |
| scrollType | 表格类型 | normal ｜ fiexd ｜ virtual | normal |
| height | 表格高度 | number | 500 |
| virtualOption | 虚拟列表配置项 | numebr | - |

column属性
| 属性 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| title | 标题 | string | - |
| slot | 插槽 | string | - |
| render | 渲染函数 | VNode | - |
| key | 对应data中的key | string | - |
| width | 当前列的宽度 | number | - |
| align | 列对齐方式 | 'left'｜ 'center' ｜ 'right' | - |

virtualOption属性
| 属性 | 说明 | 类型 | 默认值 |
|-|-|-|-|
| itemHeight | 每行高度 | number | - |
