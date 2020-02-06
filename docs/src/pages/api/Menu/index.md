---
filename: /packages/drug-ui/src/Menu/Menu.js
---

# Menu API

<p class="description">Menu React 组件的 API 文档。</p>

## Import

```js
import Menu from '@drug-ui/core/Menu';
// or
import { Menu } from '@drug-ui/core';
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">defaultOpenIndexes</span> | <span class="prop-type">any[]</span> |  | 初始展开的 ```SubMenu``` 菜单项 ```index``` 数组 |
| <span class="prop-name">openIndexes</span> | <span class="prop-type">any[]</span> | <span class="prop-default"></span> | 当前展开的 ```SubMenu``` 菜单项 ```index``` 数组。 |
| <span class="prop-name">defaultSelectedIndex</span> | <span class="prop-type">number &#124; string</span> | <span class="prop-default"></span> | 初始选中的菜单项 ```index```。 |
| <span class="prop-name">selectedIndex</span> | <span class="prop-type">number &#124; string</span> | <span class="prop-default"></span> | 当前选中的菜单项 ```index```。 |
| <span class="prop-name">onOpenChange</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | ```SubMenu``` 展开/关闭的回调。 |
| <span class="prop-name">onSelectChange</span> | <span class="prop-type">func</span> | <span class="prop-default"></span> | 被选中时的回调。 |

`ref` 被转发到根元素.

## CSS

Style sheet name: `DuiMenu`.

## Demos

- [Menu](/components/Menu)




