---
filename: /packages/drug-ui/src/ButtonBase/ButtonBase.js
---

# ButtonBase API

<p class="description">ButtonBase React 组件的 API 文档。</p>

## Import

```js
import ButtonBase from '@drug-ui/core/ButtonBase';
// or
import { ButtonBase } from '@drug-ui/core';
```

```ButtonBase``` 包含尽可能少的样式。它旨在成为创建按钮的简单构建块。它包含样式重置和一些焦点/波纹逻辑的负载。

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">centerRipple</span> | <span class="prop-type">bool</span> | false | 如果为```true```，则波纹将居中。 |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | 组件内容。 |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | 根节点组件。使用DOM元素的字符串或组件。 |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | 禁用按钮。 |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | 如果为```true```，则纹波效果将被禁用。 |
`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiButtonBase`.

## Demos

- [Buttons](/components/buttons/)




