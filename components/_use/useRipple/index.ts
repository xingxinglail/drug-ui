import { useEffect, RefObject } from 'react';
import './style/index.scss';

export interface Options {
    ref: RefObject<HTMLElement>;
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
    const { ref } = options;
    // default color rgba(0, 0, 0, 0.87)
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
            const { size, left, top } = getRippleSize(width, height, e.pageX - _left, e.pageY - _top);
            spanDom.style.top = `${ top }px`;
            spanDom.style.left = `${ left }px`;
            spanDom.style.width = `${ size }px`;
            spanDom.style.height = `${ size }px`;
            const rootDom = ref.current.querySelector('.drug-ripple-root');
            const childDom = document.createElement('span');
            childDom.className = 'drug-ripple-child';
            spanDom.appendChild(childDom);
            rootDom!.appendChild(spanDom);
            spanDom.addEventListener('animationend', () => {
                spanDom.removeChild(childDom);
                rootDom!.removeChild(spanDom);
            });
        }
    };

    useEffect(() => {
        if (ref && ref.current) {
            init();
            ref.current.addEventListener('mousedown', touchRipple);
        }
        return () => {
            if (ref && ref.current) ref.current.removeEventListener('mousedown', touchRipple);
        };
    }, []);
};
