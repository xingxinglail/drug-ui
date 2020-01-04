import * as React from 'react';
import * as PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import classnames from 'classnames';
import { styles } from './ScrollBar.style';
import { createUseStyles } from '../styles';
import { useCombinedRefs } from '@drug-ui/hooks';

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
    autoHide?: boolean;
    autoHideTime?: number;
    ref?: React.Ref<HTMLDivElement>;
}

type ButtonClassProps =
    'root'
    | 'track'
    | 'trackDragging'
    | 'trackVertical'
    | 'scrollbar'
    | 'scrollbarHide'
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
        offsetAttr: string;
        sizeAttr: string;
        scrollOffsetAttr: string;
        enabled: boolean; // 是否启用
    },
    y: {
        trackRef: React.RefObject<HTMLDivElement>; // 竖向滚动条轨道
        barRef: React.RefObject<HTMLDivElement>; // 竖向滚动条
        startYRef: number; // 拖动起始位置
        barSize: number; // 竖向滚动条高度
        trackSize: number; // 可视区域高度、轨道高度
        maxHeight: number; // 内容高度
        offsetAttr: string;
        sizeAttr: string;
        scrollOffsetAttr: string;
        enabled: boolean;
    }
}

type AxisType = 'x' | 'y';

const name = 'ScrollBar';

const useStyles = createUseStyles<ButtonClassProps>(styles, name);

const ScrollBar: React.FC<ScrollBarProps> = React.forwardRef<HTMLDivElement, ScrollBarProps>((props, ref) => {
    const { className, autoHide, autoHideTime, children, ...rest } = props;
    const classes = useStyles();
    const [scrollTop, _setScrollTop] = React.useState(0);
    const [scrollLeft, _setScrollLeft] = React.useState(0);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const moveXRef = React.useRef(0); // 点击位置，用于判断是否点到滚动条
    const moveYRef = React.useRef(0);
    const draggedAxis = React.useRef<AxisType>('x'); // 当前点击的滚动条
    const autoHideTimerId = React.useRef<number>(0);
    const axis = React.useRef<Axis>({
        x: {
            trackRef: React.useRef(null),
            barRef: React.useRef(null),
            startXRef: 0,
            barSize: 0,
            trackSize: 0,
            maxWidth: 0,
            offsetAttr: 'left',
            sizeAttr: 'offsetWidth',
            scrollOffsetAttr: 'scrollLeft',
            enabled: false
        },
        y: {
            trackRef: React.useRef(null),
            barRef: React.useRef(null),
            startYRef: 0,
            barSize: 0,
            trackSize: 0,
            maxHeight: 0,
            offsetAttr: 'top',
            sizeAttr: 'offsetHeight',
            scrollOffsetAttr: 'scrollTop',
            enabled: false
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
        const maxScrollLeft = axisX.trackSize - axisX.barSize;
        if (val > maxScrollLeft) val = maxScrollLeft;
        wrapperRef.current!.scrollLeft = val / axisX.trackSize * axisX.maxWidth;
        _setScrollLeft(val);
    };

    const onScroll: React.UIEventHandler = React.useCallback(e => {
        window.clearTimeout(autoHideTimerId.current);
        const { scrollTop, scrollLeft } = e.currentTarget;
        const { x: axisX, y: axisY } = axis.current;
        _setScrollTop(scrollTop / axisY.maxHeight * axisY.trackSize);
        _setScrollLeft(scrollLeft / axisX.maxWidth * axisX.trackSize);
        if ((axisX.enabled || axisY.enabled) && autoHide) {
            if (axisX.enabled) axisX.barRef.current!.classList.remove(classes.scrollbarHide);
            if (axisY.enabled) axisY.barRef.current!.classList.remove(classes.scrollbarHide);
            autoHideTimerId.current = window.setTimeout(() => {
                if (axisX.enabled) axisX.barRef.current!.classList.add(classes.scrollbarHide);
                if (axisX.enabled) axisY.barRef.current!.classList.add(classes.scrollbarHide);
            }, autoHideTime);
        }
    }, []);

    const onDrag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedAxis.current === 'x') {
            setScrollLeft(scrollLeft + (e.pageX - axis.current.x.startXRef));
        } else {
            setScrollTop(scrollTop + (e.pageY - axis.current.y.startYRef));
        }
    };

    const onDragEnd = () => {
        axis.current[draggedAxis.current].trackRef.current!.classList.remove(classes.trackDragging);
        document.removeEventListener('mousemove', onDrag, true);
        document.removeEventListener('mouseup', onDragEnd, true);
    };

    const onDragStart = (e: React.MouseEvent, axisType: AxisType) => {
        draggedAxis.current = axisType;
        axis.current[axisType].trackRef.current!.classList.add(classes.trackDragging);
        document.addEventListener('mousemove', onDrag, true);
        document.addEventListener('mouseup', onDragEnd, true);
    };

    const onTrackClick = (axisType: AxisType) => {
        const currentAxis = axis.current[axisType];
        const scrollbarOffset = currentAxis.barRef.current!.getBoundingClientRect()[currentAxis.offsetAttr];
        const hostSize = innerRef.current![currentAxis.sizeAttr];
        let scrolled = wrapperRef.current![currentAxis.scrollOffsetAttr];
        const t =
            axisType === 'y'
                ? moveYRef.current - scrollbarOffset
                : moveXRef.current - scrollbarOffset;
        const dir = t < 0 ? -1 : 1;
        const scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
        const speed = 40;
        const scrollTo = () => {
            if (dir === -1) {
                if (scrolled > scrollSize) {
                    scrolled -= speed;
                    wrapperRef.current!.scrollTo({
                        [currentAxis.offsetAttr]: scrolled
                    });
                    window.requestAnimationFrame(scrollTo);
                }
            } else {
                if (scrolled < scrollSize) {
                    scrolled += speed;
                    wrapperRef.current!.scrollTo({
                        [currentAxis.offsetAttr]: scrolled
                    });
                    window.requestAnimationFrame(scrollTo);
                }
            }
        };
        scrollTo();
    };

    const onPointerEvent: React.MouseEventHandler = e => {
        moveXRef.current = e.clientX;
        moveYRef.current = e.clientY;
        const { x: axisX, y: axisY } = axis.current;
        axisX.startXRef = e.pageX;
        axisY.startYRef = e.pageY;
        let isWithinTrackXBounds = false;
        let isWithinTrackYBounds = false;

        if (axisX.enabled) isWithinTrackXBounds = isWithinBounds(axisX.trackRef.current!.getBoundingClientRect());

        if (axisY.enabled) isWithinTrackYBounds = isWithinBounds(axisY.trackRef.current!.getBoundingClientRect());

        if (isWithinTrackXBounds || isWithinTrackYBounds) {
            if (isWithinTrackXBounds) {
                if (isWithinBounds(axisX.barRef.current!.getBoundingClientRect())) {
                    onDragStart(e, 'x');
                } else {
                    onTrackClick('x');
                }
            }
            if (isWithinTrackYBounds) {
                if (isWithinBounds(axisY.barRef.current!.getBoundingClientRect())) {
                    onDragStart(e, 'y');
                } else {
                    onTrackClick('y');
                }
            }
        }
    };

    const recalculate = () => {
        const { scrollWidth: maxWidth, scrollHeight: maxHeight, offsetWidth: trackWidth, offsetHeight: trackHeight, scrollLeft, scrollTop } = wrapperRef.current!;
        const { x: axisX, y: axisY } = axis.current;
        const setAxis = (maxSize: number, trackSize: number, axis: any, sizeType: string) => {
            if (maxSize > trackSize) {
                const size = Math.floor(trackSize / maxSize * trackSize);
                axis.barSize = size;
                axis.barRef.current!.style[sizeType] = `${ size }px`;
                axis.enabled = true;
                axis.trackRef.current!.style.visibility = 'visible';
            } else {
                axis.enabled = false;
                axis.trackRef.current!.style.visibility = 'hidden';
            }
        };
        setAxis(maxWidth, trackWidth, axisX, 'width');
        setAxis(maxHeight, trackHeight, axisY, 'height');
        axisX.maxWidth = maxWidth;
        axisX.trackSize = trackWidth;
        axisY.maxHeight = maxHeight;
        axisY.trackSize = trackHeight;
        setScrollLeft(scrollLeft / maxWidth * trackWidth);
        setScrollTop(scrollTop / maxHeight * trackHeight);
    };

    React.useEffect(() => {
        // @ts-ignore
        const ResizeObserverConstructor = window.ResizeObserver || ResizeObserver;
        const resizeObserver = new ResizeObserverConstructor(recalculate);
        resizeObserver.observe(innerRef.current!);
        resizeObserver.observe(wrapperRef.current!.children[0]);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            className={ classNames }
            ref={ combinedRef }
            onMouseDown={ onPointerEvent }
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
                    className={ classnames(classes.scrollbar, classes.scrollbarHorizontal, { [classes.scrollbarHide]: autoHide }) }
                    ref={ axis.current.x.barRef }
                    style={ { transform: `translate3d(${ scrollLeft }px, 0, 0)` } } />
            </div>
            <div
                className={ classnames(classes.track, classes.trackVertical) }
                ref={ axis.current.y.trackRef }>
                <div
                    className={ classnames(classes.scrollbar, classes.scrollbarVertical, { [classes.scrollbarHide]: autoHide }) }
                    ref={ axis.current.y.barRef }
                    style={ { transform: `translate3d(0, ${ scrollTop }px, 0)` } } />
            </div>
        </div>
    );
});

ScrollBar.displayName = name;

ScrollBar.defaultProps = {
    autoHide: true,
    autoHideTime: 2000
};

ScrollBar.propTypes = {
    autoHide: PropTypes.bool,
    autoHideTime: PropTypes.number
};

export default ScrollBar;
