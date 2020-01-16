---
filename: /packages/drug-ui/src/Button/Button.js
---

# Button API

<p class="description">Button React组件的API文档。</p>

## Import

```js
import Button from '@drug-ui/core/Button';
// or
import { Button } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled.<br>⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `focusVisibleClassName`. |
| <span class="prop-name">endIcon</span> | <span class="prop-type">node</span> |  | Element placed after the children. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will take up the full width of its container. |
| <span class="prop-name">href</span> | <span class="prop-type">string</span> |  | The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">startIcon</span> | <span class="prop-type">node</span> |  | Element placed before the children. |
| <span class="prop-name">variant</span> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'contained'</span> | <span class="prop-default">'text'</span> | The variant to use. |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiButton`.

## Demos

- [Buttons](/components/buttons/)




