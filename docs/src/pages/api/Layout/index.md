---
filename: /packages/drug-ui/src/Layout/Layout.js
---

# Layout API

<p class="description">Layout React 组件的 API 文档。</p>

## Import

```js
import Layout from '@drug-ui/core/Layout';
// or
import { Layout } from '@drug-ui/core';

const { Header, Content, Aside, Footer } = Layout;
```

## Layout/Header/Content/Footer Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | 组件内容。 |

`ref` 被转发到根元素.

## Aside Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | 组件内容。 |
| <span class="prop-name">width</span> | <span class="prop-type">number &#124; string</span> | 200 | 组件宽度。 |

`ref` 被转发到根元素.


## CSS

Style sheet name: `DuiLayout`.

## Demos

- [Layouts](/drug-ui/components/layouts/)




