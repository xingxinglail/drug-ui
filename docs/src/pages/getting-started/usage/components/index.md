---
title: 快速上手
---

# 快速上手

下面是来帮助您入门的一个快速示例

要使用 ```ThemeProvider``` 来包裹所有组件。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@drug-ui/core/ThemeProvider';
import Button from '@drug-ui/core/Button';

function App() {
  return (
    <ThemeProvider>
        <Button variant="contained" color="primary">
            你好，世界
        </Button>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
