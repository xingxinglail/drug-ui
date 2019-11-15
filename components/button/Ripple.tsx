import { FC, createElement, useRef } from 'react';
import { scopedClassMaker } from '../_util';
import './style/ripple.scss';

const scopedClass = scopedClassMaker('drug-ripple');

interface RippleProps {
    center?: boolean;
}

const getRippleSize = (width: number, height: number, positionX: number, positionY: number) => {
    // 得到点击位置距离最远的点，计算出这两点之间的距离
    const square = (x: number) => x * x;
    const coordinates = [[0, 0], [width, 0], [0, height], [width, height]].map(coordinate => {
        return Math.sqrt(square(coordinate[0] - positionX) + square(coordinate[1] - positionY));
    });
    // 最长边即为半径
    const radius = Math.max.apply({}, coordinates);
    const size = radius * 2;
    const left = positionX - size / 2;
    const top = positionY - size / 2;
    return { size, left, top };
};

const Ripple: FC<RippleProps> = (props) => {
    const ref = useRef<HTMLElement>(null);
    let childDom: HTMLSpanElement;

    const handleMouseDown = (e: MouseEvent) => {
        if (ref.current) {
            const { left: _left, top: _top, width, height } = ref.current.getBoundingClientRect();
            const spanDom = document.createElement('span');
            spanDom.className = scopedClass('visible');
            let { size, left, top } = getRippleSize(width, height, e.pageX - _left, e.pageY - _top);
            if (props.center) {
                size = Math.max(width, height);
                left = (width - size) / 2;
                top = (height - size) / 2;
            }
            spanDom.style.width = `${ size }px`;
            spanDom.style.height = `${ size }px`;
            spanDom.style.top = `${ top }px`;
            spanDom.style.left = `${ left }px`;
            childDom = document.createElement('span');
            childDom.className = scopedClass('child');
            ;
            spanDom.appendChild(childDom);
            ref.current.appendChild(spanDom);
            const remove = () => {
                childDom.removeEventListener('animationend', remove);
                spanDom.remove();
            };
            childDom.addEventListener('animationend', remove);
        }
    };

    const handleMouseUp = () => {
        if (childDom) childDom.classList.add(scopedClass('child-leaving'));
    };

    return createElement('span', {
        className: scopedClass(),
        ref,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        onDragLeave: handleMouseUp
    });
};

Ripple.defaultProps = {
    center: false
};

export default Ripple;
