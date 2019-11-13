import { useEffect, RefObject } from 'react';
import './style/index.scss';

export interface Options {
    ref: RefObject<HTMLElement>;
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

export function useRipple (options: Options) {
    const { ref, center } = options;
    let childDom: HTMLSpanElement;

    const init = () => {
        const spanDom = document.createElement('span');
        spanDom.className = 'drug-ripple-root';
        ref.current!.appendChild(spanDom);
    };

    const touchRipple = (e: MouseEvent) => {
        if (ref && ref.current) {
            const { left: _left, top: _top, width, height } = ref.current.getBoundingClientRect();
            const spanDom = document.createElement('span');
            spanDom.className = 'drug-ripple';
            let { size, left, top } = getRippleSize(width, height, e.pageX - _left, e.pageY - _top);
            if (center) {
                size = Math.max(width, height);
                left = (width - size) / 2;
                top = (height - size) / 2;
            }
            spanDom.style.width = `${ size }px`;
            spanDom.style.height = `${ size }px`;
            spanDom.style.top = `${ top }px`;
            spanDom.style.left = `${ left }px`;
            const rootDom = ref.current.querySelector('.drug-ripple-root');
            childDom = document.createElement('span');
            childDom.className = 'drug-ripple-child';
            spanDom.appendChild(childDom);
            rootDom!.appendChild(spanDom);
            const remove = () => {
                childDom.removeEventListener('animationend', remove);
                spanDom.remove();
            };
            childDom.addEventListener('animationend', remove);
        }
    };

    const removeRipple = () => {
        childDom.classList.add('drug-ripple-child-leaving');
    };

    useEffect(() => {
        if (ref && ref.current) {
            init();
            ref.current.addEventListener('mousedown', touchRipple);
            ref.current.addEventListener('mouseup', removeRipple);
        }
        return () => {
            if (ref && ref.current) {
                ref.current.removeEventListener('mousedown', touchRipple);
                ref.current.removeEventListener('mouseup', removeRipple);
            }
        };
    }, []);
};
