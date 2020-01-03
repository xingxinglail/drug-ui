import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as ComponentPropTypes } from '..';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './ScrollBar.style';
import { createUseStyles } from '../styles';
import { useCombinedRefs } from '@drug-ui/hooks';

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>
}

type ButtonClassProps =
    'root'
    | 'track'
    | 'trackDragging'
    | 'trackVertical'
    | 'scrollbarVertical'
    | 'trackHorizontal'
    | 'scrollbarHorizontal'
    | 'contentWrapper';

interface Axis {
    x: {
        trackRef: React.RefObject<HTMLDivElement>; // 横向滚动条轨道
        barRef: React.RefObject<HTMLDivElement>; // 横向滚动条
        startXRef: number; // 拖动起始位置
        barSize: number; // 竖向滚动条宽度
        trackSize: number; // 可视区域宽度、轨道宽度
        maxWidth: number; // 内容宽度
    },
    y: {
        trackRef: React.RefObject<HTMLDivElement>; // 竖向滚动条轨道
        barRef: React.RefObject<HTMLDivElement>; // 竖向滚动条
        startYRef: number; // 拖动起始位置
        barSize: number; // 竖向滚动条高度
        trackSize: number; // 可视区域高度、轨道高度
        maxHeight: number; // 内容高度
    }
}

const name = 'ScrollBar';

const useStyles = createUseStyles<ButtonClassProps>(styles, name);

const ScrollBar: React.FC<ScrollBarProps> = React.forwardRef<HTMLDivElement, ScrollBarProps>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();
    const [scrollTop, _setScrollTop] = React.useState(0);
    const [scrollLeft, _setScrollLeft] = React.useState(0);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const moveXRef = React.useRef(0); // 点击位置，用于判断是否点到滚动条
    const moveYRef = React.useRef(0);
    const draggedAxis = React.useRef('x'); // 当前点击的滚动条
    const axis = React.useRef<Axis>({
        x: {
            trackRef: React.useRef(null),
            barRef: React.useRef(null),
            startXRef: 0,
            barSize: 0,
            trackSize: 0,
            maxWidth: 0
        },
        y: {
            trackRef: React.useRef(null),
            barRef: React.useRef(null),
            startYRef: 0,
            barSize: 0,
            trackSize: 0,
            maxHeight: 0
        }
    });

    const classNames = classnames(
        classes.root,
        className
    );

    const isWithinBounds = React.useCallback(({ left, right, top, bottom }: DOMRect) => {
        return (
            moveXRef.current >= left &&
            moveXRef.current <= right &&
            moveYRef.current >= top && moveYRef.current <= bottom
        );
    }, []);

    const setScrollTop = (val: number) => {
        if (val < 0) val = 0;
        const { y: axisY } = axis.current;
        const maxScrollTop = axisY.trackSize - axisY.barSize;
        if (val > maxScrollTop) val = maxScrollTop;
        wrapperRef.current!.scrollTop = val / axisY.trackSize * axisY.maxHeight;
        _setScrollTop(val);
    };

    const setScrollLeft = (val: number) => {
        if (val < 0) val = 0;
        const { x: axisX } = axis.current;
        const maxScrollTop = axisX.trackSize - axisX.barSize;
        if (val > maxScrollTop) val = maxScrollTop;
        wrapperRef.current!.scrollLeft = val / axisX.trackSize * axisX.maxWidth;
        _setScrollLeft(val);
    };

    const onScroll: React.UIEventHandler = e => {
        const { scrollTop, scrollLeft } = e.currentTarget;
        const { x: axisX, y: axisY } = axis.current;
        _setScrollTop(scrollTop / axisY.maxHeight * axisY.trackSize);
        _setScrollLeft(scrollLeft / axisX.maxWidth * axisX.trackSize);
    };
    const onDrag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedAxis.current === 'x') {
            setScrollLeft(scrollLeft + (e.pageX - axis.current.x.startXRef))
        } else {
            setScrollTop(scrollTop + (e.pageY - axis.current.y.startYRef));
        }
    };

    const onDragEnd = () => {
        axis.current[draggedAxis.current].trackRef.current!.classList.remove(classes.trackDragging);
        document.removeEventListener('mousemove', onDrag, true);
        document.removeEventListener('mouseup', onDragEnd, true);
    };

    const onDragStart = (e: React.MouseEvent, axisType: string) => {
        draggedAxis.current = axisType;
        axis.current[axisType].trackRef.current!.classList.add(classes.trackDragging);
        document.addEventListener('mousemove', onDrag, true);
        document.addEventListener('mouseup', onDragEnd, true);
    };

    const onPointerEvent: React.MouseEventHandler = e => {
        moveXRef.current = e.clientX;
        moveYRef.current = e.clientY;
        const { x: axisX, y: axisY } = axis.current;
        axisX.startXRef = e.pageX;
        axisY.startYRef = e.pageY;
        const isWithinTrackXBounds = isWithinBounds(axisX.trackRef.current!.getBoundingClientRect());
        const isWithinTrackYBounds = isWithinBounds(axisY.trackRef.current!.getBoundingClientRect());

        if (isWithinTrackXBounds || isWithinTrackYBounds) {
            if (isWithinTrackXBounds) {
                if (isWithinBounds(axisX.barRef.current!.getBoundingClientRect())) {
                    onDragStart(e, 'x');
                } else {
                    //  todo 点击滚动一段距离
                    console.log('Track');
                }
            }
            if (isWithinTrackYBounds) {
                if (isWithinBounds(axisY.barRef.current!.getBoundingClientRect())) {
                    onDragStart(e, 'y');
                } else {
                    //  todo 点击滚动一段距离
                    console.log('Track');
                }
            }
        }
    };

    const onMouseMove: React.MouseEventHandler = React.useCallback((e) => {

    }, []);

    const onMouseLeave: React.MouseEventHandler = React.useCallback((e) => {
        moveXRef.current = 0;
        moveYRef.current = 0;
    }, []);

    React.useEffect(() => {
        const { current } = wrapperRef;
        const maxWidth = current!.scrollWidth;
        const maxHeight = current!.scrollHeight;
        const trackWidth = current!.offsetWidth; // 可视区域宽度、轨道宽度
        const trackHeight = current!.offsetHeight; // 可视区域高度、轨道高度
        const { x: axisX, y: axisY } = axis.current;
        if (maxHeight > trackHeight) {
            const h = Math.floor(trackHeight / maxHeight * trackHeight);
            axisY.barSize = h;
            axisY.barRef.current!.style.height = `${ h }px`;
        }
        if (maxWidth > trackWidth) {
            const w = Math.floor(trackWidth / maxWidth * trackWidth);
            axisX.barSize = w;
            axisX.barRef.current!.style.width = `${ w }px`;
        }
        axisX.maxWidth = maxWidth;
        axisX.trackSize = trackWidth;
        axisY.maxHeight = maxHeight;
        axisY.trackSize = trackHeight;
    }, []);

    return (
        <div
            className={ classNames }
            ref={ combinedRef }
            onMouseDown={ onPointerEvent }
            onMouseMove={ onMouseMove }
            onMouseLeave={ onMouseLeave }
            { ...rest }>
            <div
                className={ classes.contentWrapper }
                ref={ wrapperRef }
                onScroll={ onScroll }>
                { children }
            </div>
            <div
                className={ classnames(classes.track, classes.trackHorizontal) }
                ref={ axis.current.x.trackRef }>
                <div
                    className={ classes.scrollbarHorizontal }
                    ref={ axis.current.x.barRef }
                    style={ { transform: `translate3d(${ scrollLeft }px, 0, 0)` } } />
            </div>
            <div
                className={ classnames(classes.track, classes.trackVertical) }
                ref={ axis.current.y.trackRef }>
                <div
                    className={ classes.scrollbarVertical }
                    ref={ axis.current.y.barRef }
                    style={ { transform: `translate3d(0, ${ scrollTop }px, 0)` } } />
            </div>
        </div>
    );
});

ScrollBar.displayName = name;

ScrollBar.defaultProps = {};

ScrollBar.propTypes = {};

export default ScrollBar;
