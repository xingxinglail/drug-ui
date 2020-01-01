import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as ComponentPropTypes } from '..';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './ScrollBar.style';
import { createUseStyles } from '../styles';
import { useCombinedRefs } from '@drug-ui/hooks';
import { UIEventHandler } from 'react';
import { MouseEventHandler } from 'react';

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>
}

type ButtonClassProps =
    'root'
    | 'track'
    | 'trackVertical'
    | 'scrollbar'
    | 'contentWrapper';

const name = 'ScrollBar';

const useStyles = createUseStyles<ButtonClassProps>(styles, name);

const ScrollBar: React.FC<ScrollBarProps> = React.forwardRef<HTMLDivElement, ScrollBarProps>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();
    const [scrollTop, setScrollTop] = React.useState(0);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const verticalTrackRef = React.useRef<HTMLDivElement>(null); // 竖向滚动条轨道
    const verticalBarRef = React.useRef<HTMLDivElement>(null); // 竖向滚动条
    const maxHeightRef = React.useRef(0);
    const trackHeightRef = React.useRef(0); // 可视区域高度、轨道高度
    const moveXRef = React.useRef(0);
    const moveYRef = React.useRef(0);

    const classNames = classnames(
        classes.root,
        className
    );

    const isWithinBounds = React.useCallback((rect: DOMRect) => {
        // todo 计算滚动条是否在点击区域内
        console.log(rect.top);
    }, []);

    const onScroll: UIEventHandler = e => {
        setScrollTop(Math.floor(e.currentTarget.scrollTop / maxHeightRef.current * trackHeightRef.current));
    };

    const onPointerEvent: MouseEventHandler = React.useCallback((e) => {
        // console.log(e.target);
        // console.log(verticalTrackRef.current!.getBoundingClientRect());
        isWithinBounds(verticalTrackRef.current!.getBoundingClientRect());
    }, []);

    const onMouseMove: MouseEventHandler = React.useCallback((e) => {
        moveXRef.current = e.clientX;
        moveYRef.current = e.clientY;
    }, []);

    const onMouseLeave: MouseEventHandler = React.useCallback((e) => {
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
            verticalBarRef.current!.style.height = `${ Math.floor(trackHeight / maxHeight * trackHeight) }px`;
        }
        if (maxWidth > trackWidth) {
        }
        maxHeightRef.current = maxHeight;
        trackHeightRef.current = trackHeight;
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
                className={ classnames(classes.track, classes.trackVertical) }
                ref={ verticalTrackRef }>
                <div
                    className={ classes.scrollbar }
                    ref={ verticalBarRef }
                    style={ { transform: `translate3d(0, ${ scrollTop }px, 0)` } } />
            </div>
        </div>
    );
});

ScrollBar.displayName = name;

ScrollBar.defaultProps = {};

ScrollBar.propTypes = {};

export default ScrollBar;
