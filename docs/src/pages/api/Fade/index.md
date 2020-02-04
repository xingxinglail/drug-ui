---
filename: /packages/drug-ui/src/Fade/Fade.js
---

# Fade API

<p class="description">Fade React 组件的 API 文档。</p>

## Import

```js
import Fade from '@drug-ui/core/Fade';
// or
import { Fade } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | 内容节点。 |
| <span class="prop-name">in</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | 如果为```true```，组件将开始进入过渡。 |
| <span class="prop-name">timeout</span> | <span class="prop-type">number &#124; { enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: 225, exit: 195 }</span> | 过渡时长。 |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiFade`.

## Demos

- [Transitions](/drug-ui/components/transitions/)




