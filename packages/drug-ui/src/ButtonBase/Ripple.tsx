import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createUseStyles } from '@drug-ui/styles';
import { styles } from './Ripple.style';
import { Theme } from '../styles';

interface RippleProps {
    center?: boolean;
}

type RippleClassProps = 'root' | 'visible' | 'child' | 'childLeaving';

const name = 'Ripple';
const useStyles = createUseStyles<Theme, RippleClassProps>(styles, { name });

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

const Ripple: React.FC<RippleProps> = (props) => {
    const ref = React.useRef<HTMLElement>(null);
    let childDom: HTMLSpanElement;
    const classes = useStyles();
    const handleMouseDown = (e: MouseEvent) => {
        const root = ref.current;
        if (root) {
            const { left: _left, top: _top, width, height } = root.getBoundingClientRect();
            const spanDom = document.createElement('span');
            spanDom.className = classes.visible;
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
            childDom.className = classes.child;
            spanDom.appendChild(childDom);
            root.appendChild(spanDom);
            const remove = () => {
                childDom.removeEventListener('animationend', remove);
                spanDom.remove();
            };
            childDom.addEventListener('animationend', remove);
        }
    };

    const handleMouseUp = () => {
        if (childDom) childDom.classList.add(classes.childLeaving);
    };

    return React.createElement('span', {
        className: classes.root,
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

Ripple.propTypes = {
    center: PropTypes.bool
};

export default Ripple;
