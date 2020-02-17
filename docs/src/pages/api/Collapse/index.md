---
filename: /packages/drug-ui/src/Collapse/Collapse.js
---

# Collapse API

<p class="description">Collapse React 组件的 API 文档。</p>

## Import

```js
import Collapse from '@drug-ui/core/Collapse';
// or
import { Collapse } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | 内容节点。 |
| <span class="prop-name">collapsedHeight</span> | <span class="prop-type">number &#124; string</span> | <span class="prop-default">0px</span> | 容器折叠起来的高度。 |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | 如果为```true```，组件将开始进入过渡。 |
| <span class="prop-name">timeout</span> | <span class="prop-type">number &#124; { enter?: number, exit?: number }</span> | <span class="prop-default">300ms</span> | 过渡时长。 |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiCollapse`.

## Demos

- [Menu](/components/Menu/)
- [Transitions](/components/Transitions/)




