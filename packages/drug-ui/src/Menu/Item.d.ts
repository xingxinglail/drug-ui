import * as React from 'react';
export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
    index: number | string;
    ref?: React.Ref<HTMLLIElement>;
}
declare const Item: React.FC<ItemProps>;
export default Item;
