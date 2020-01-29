---
title: 快速上手
---

# 快速上手

下面是来帮助您入门的一个快速示例

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@drug-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      你好，世界
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
