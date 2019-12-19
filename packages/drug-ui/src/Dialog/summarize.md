### Dialog 总结

#### Exclude

```typescript
    type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
    type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // 'c'
    type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

#### Pick

```typescript
interface Person {
    name: string;
    age: number;
    hobbies: string[];
}

type newPerson = Pick<Person, 'name' | 'age'>;

const person: newPerson = {
    name: 'star',
    age: 25
}
```

#### useCombinedRefs

由于组件内部需要用到 dom 引用，故需要做一次合并处理。
