---
title: 布局
---

# Layout（布局）

<p class="description">协助进行页面级整体布局。</p>

## 组件概述

- ```Layout```：布局容器，其下可嵌套 ```Header``` ```Aside``` ```Content``` ```Footer``` 或 ```Layout``` 本身，可以放在任何父容器中。

- ```Header```：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 ```Layout``` 中。

- ```Aside```：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 ```Layout``` 中。

- ```Content```：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 ```Layout``` 中。

- ```Footer```：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 ```Layout``` 中。

## 代码演示

{{"demo": "pages/Layouts/components/Index.js"}}

## API

- [&lt;Layout /&gt;](/api/Layout)
