---
filename: /packages/drug-ui/src/IconButton/IconButton.js
---

# IconButton API

<p class="description">IconButton React 组件的 API 文档。</p>

## Import

```js
import IconButton from '@drug-ui/core/IconButton';
// or
import { IconButton } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | 图标元素。 |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | 组件颜色。 |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | 根节点组件。使用DOM元素的字符串或组件。 |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | 禁用按钮。 |
| <span class="prop-name">href</span> | <span class="prop-type">string</span> |  | 单击按钮时要链接到的URL。默认渲染 ```a``` 节点。 |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | 按钮大小。 |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiIconButton`.

## Demos

- [Buttons](/drug-ui/components/Buttons)




