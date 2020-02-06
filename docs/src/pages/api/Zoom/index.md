---
filename: /packages/drug-ui/src/Zoom/Zoom.js
---

# Zoom API

<p class="description">Zoom React 组件的 API 文档。</p>

## Import

```js
import Zoom from '@drug-ui/core/Zoom';
// or
import { Zoom } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">element</span> |  | 单个子内容元素。 |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | 如果为```true```，组件将开始进入过渡。 |
| <span class="prop-name">timeout</span> | <span class="prop-type">number &#124; { enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: 225, exit: 195 }</span> | 过渡时长。 |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiZoom`.

## Demos

- [Transitions](/drug-ui/components/Transitions)




