---
filename: /packages/drug-ui/src/Notification/Notification.js
---

# Notification API

<p class="description">Notification React 组件的 API 文档。</p>

## Import

```js
import notification from '@drug-ui/core/Notification';
// or
import { notification } from '@drug-ui/core';
```

## API

- ```notification.success(config)```

- ```notification.warning(config)```

- ```notification.info(config)```

- ```notification.error(config)```

- ```notification.open(config)```

- ```notification.close(key: string)```

- ```notification.destroy()```

config 参数如下：

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">message&nbsp;*</span> | <span class="prop-type">string&#124;ReactNode</span> |  | 通知提醒标题，必选。 |
| <span class="prop-name required">description&nbsp;*</span> | <span class="prop-type">string&#124;ReactNode</span> |  | 通知提醒内容，必选。 |
| <span class="prop-name">className</span> | <span class="prop-type"></span> | <span class="prop-default"></span> | 自定义 CSS class。 |
| <span class="prop-name">placement</span> | <span class="prop-type">'topLeft'<br>&#124;&nbsp;'topRight'<br>&#124;&nbsp;'bottomLeft'<br>&#124;&nbsp;'bottomRight'</span> | <span class="prop-default">'topRight'</span> | 弹出位置。 |
| <span class="prop-name">duration</span> | <span class="prop-type">number</span> | <span class="prop-default">4500</span> | 自动关闭时间，配置为 ```0``` 则不会自动关闭。 |
| <span class="prop-name">btn</span> | <span class="prop-type">ReactNode</span> | <span class="prop-default"></span> | 自定义关闭按钮。 |
| <span class="prop-name">icon</span> | <span class="prop-type">ReactNode</span> | <span class="prop-default"></span> | 自定义图标。 |
| <span class="prop-name">closeIcon</span> | <span class="prop-type">ReactNode</span> | <span class="prop-default"></span> | 自定义关闭图标。 |
| <span class="prop-name">style</span> | <span class="prop-type">React.CSSProperties</span> | <span class="prop-default"></span> | 自定义内联样式。 |
| <span class="prop-name">key</span> | <span class="prop-type">string</span> |  | 当前通知唯一key。 |
| <span class="prop-name">getContainer</span> | <span class="prop-type">() => Element</span> | <span class="prop-default">() => document.body</span> | 配置渲染节点的输出位置。 |
| <span class="prop-name">top</span> | <span class="prop-type">number</span> | <span class="prop-default">24</span> | 消息从顶部弹出时，距离顶部的位置。 |
| <span class="prop-name">bottom</span> | <span class="prop-type">number</span> | <span class="prop-default">24</span> | 消息从底部弹出时，距离底部的位置。 |
| <span class="prop-name">onClick</span> | <span class="prop-type">(e: React.MouseEvent) => void</span> | <span class="prop-default"></span> | 点击通知时触发的回调函数。 |
| <span class="prop-name">onClose</span> | <span class="prop-type">() => void</span> | <span class="prop-default"></span> | 关闭时触发的回调函数。 |

## CSS

Style sheet name: `DuiNotification`.

## Demos

- [Notifications](/components/Notifications/)




