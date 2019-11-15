### Button 总结

1. React.forwardRef
    - 要获取子组件的 ```ref``` 必须使用 ```React.forwardRef``` 来创建一个组件
  
2. React.Children
    - ```React.Children``` 可以遍历 ```props.children``` 可以对每一个 children 进行额外处理。 

3. 类型
    - ```FC``` 函数组件类型。
    - ```ReactNode``` 所有 children 类型。
    - ```ElementType``` html 标签名或者函数组件。
    - ```HTMLAttributes``` html 标签属性。
