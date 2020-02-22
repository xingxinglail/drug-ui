---
title: 通知提醒框
---

# Notifications（通知提醒框）

<p class="description">全局展示通知提醒信息。</p>

## 基本用法

最简单的用法，```4.5s``` 后自动关闭。取消自动关闭只要将该值设为 ```0``` 即可。

{{"demo": "pages/Notifications/components/Basic.js"}}

## 自定义弹出位置

通知从右上角、右下角、左下角、左上角弹出。

{{"demo": "pages/Notifications/components/Placement.js"}}

## 带有图标的通知提醒框

常用来显示「成功、警告、消息、错误」类的系统消息。

{{"demo": "pages/Notifications/components/Type.js"}}

## 自定义按钮

自定义关闭按钮的样式和文字。

{{"demo": "pages/Notifications/components/Btn.js"}}

## 更新消息内容

可以通过唯一的 key 来更新内容。

{{"demo": "pages/Notifications/components/Update.js"}}

## API

- [Notification](/api/Notification/)
