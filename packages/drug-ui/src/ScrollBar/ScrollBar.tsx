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
// todo 控制横向滚动条
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
        const maxScrollTop = axis.current.y.trackSize - axis.current.y.barSize;
        if (val > maxScrollTop) val = maxScrollTop;
        wrapperRef.current!.scrollTop = val / axis.current.y.trackSize * axis.current.y.maxHeight;
        _setScrollTop(val);
    };

    const onScroll: React.UIEventHandler = e => {
        _setScrollTop(Math.floor(e.currentTarget.scrollTop / axis.current.y.maxHeight * axis.current.y.trackSize));
    };
    const onDrag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollTop(scrollTop + (e.pageY - axis.current.y.startYRef));
    };

    const onDragEnd = () => {
        axis.current.y.trackRef.current!.classList.remove(classes.trackDragging);
        document.removeEventListener('mousemove', onDrag, true);
        document.removeEventListener('mouseup', onDragEnd, true);
    };

    const onDragStart: React.MouseEventHandler = e => {
        axis.current.y.trackRef.current!.classList.add(classes.trackDragging);
        document.addEventListener('mousemove', onDrag, true);
        document.addEventListener('mouseup', onDragEnd, true);
    };

    const onPointerEvent: React.MouseEventHandler = e => {
        moveXRef.current = e.clientX;
        moveYRef.current = e.clientY;
        axis.current.y.startYRef = e.pageY
        const isWithinTrackYBounds = isWithinBounds(axis.current.y.trackRef.current!.getBoundingClientRect());
        if (isWithinTrackYBounds) {
            if (isWithinBounds(axis.current.y.barRef.current!.getBoundingClientRect())) {
                onDragStart(e);
            } else {
                //  todo 点击滚动一段距离
                console.log('Track');
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
        if (maxHeight > trackHeight) {
            const h = Math.floor(trackHeight / maxHeight * trackHeight);
            axis.current.y.barSize = h;
            axis.current.y.barRef.current!.style.height = `${ h }px`;
        }
        if (maxWidth > trackWidth) {
            const w = Math.floor(trackWidth / maxWidth * trackWidth);
            axis.current.x.barSize = w;
            axis.current.x.barRef.current!.style.width = `${ w }px`;
        }
        axis.current.y.maxHeight = maxHeight;
        axis.current.y.trackSize = trackHeight;
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
