---
filename: /packages/drug-ui/src/Dialog/Dialog.js
---

# Dialog API

<p class="description">Dialog React 组件的 API 文档。</p>

## Import

```js
import Dialog from '@drug-ui/core/Dialog';
// or
import { Dialog } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | 组件内容。 |
| <span class="prop-name">visible</span> | <span class="prop-type">bool</span> | <span class="prop-default">true</span> | 如果为 ```true```，则显示组件。 |
| <span class="prop-name">zIndex</span> | <span class="prop-type">number</span> | <span class="prop-default">1000</span> | ```z-index``` 层级样式。 |
| <span class="prop-name">width</span> | <span class="prop-type">string &#124; number</span> | <span class="prop-default">50%</span> | 组件宽度。 |
| <span class="prop-name">top</span> | <span class="prop-type">string &#124; number</span> | <span class="prop-default">15vh</span> | 组件距顶部位置。 |
| <span class="prop-name">mask</span> | <span class="prop-type">bool</span> | <span class="prop-default">true</span> | 如果为 ```true```，则显示遮罩。 |
| <span class="prop-name">maskClosable</span> | <span class="prop-type">bool</span> | <span class="prop-default">true</span> | 如果为 ```true```，则可以点击遮罩关闭对话框。 |
| <span class="prop-name">closable</span> | <span class="prop-type">bool</span> | <span class="prop-default">true</span> | 如果为 ```true```，则显示关闭图标。 |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool</span> | <span class="prop-default">true</span> | 如果为 ```true```，则不会被销毁。 |
| <span class="prop-name">footer</span> | <span class="prop-type">string &#124; node</span> | <span class="prop-default"></span> | 对话框底部内容。 |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number &#124; { enter?: number, exit?: number }</span> | <span class="prop-default">300</span> | 过渡的持续时间（以毫秒为单位）。 |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 当组件请求关闭时触发回调。 |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 对话框进入之前触发了回调。 |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 当对话框进入时触发回调。 |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 进入对话框后触发回调。 |
| <span class="prop-name">onExit</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 对话框退出前触发了回调。 |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 对话框退出时触发回调。 |
| <span class="prop-name">onExited</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 对话框退出后触发回调。 |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiDialog`.

## Demos

- [Dialog](/drug-ui/components/Dialogs)




