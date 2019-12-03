import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './SvgIcon.style';
import { createUseStyles } from '../styles';

export type Color = 'inherit' | 'primary' | 'secondary' | 'disabled';
export type FontSize = 'inherit' | 'default' | 'small' | 'large';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
    color?: Color;
    fontSize?: FontSize;
    htmlColor?: string;
    titleAccess?: string;
    viewBox?: string;
    ref?: React.Ref<SVGSVGElement>
}

type SvgIconPropsClassProps =
    'root'
    | 'colorPrimary'
    | 'colorSecondary'
    | 'colorDisabled'
    | 'fontSizeInherit'
    | 'fontSizeSmall'
    | 'fontSizeLarge';

const name = 'SvgIcon';

const useStyles = createUseStyles<SvgIconPropsClassProps>(styles, name);
const SvgIcon: React.FC<SvgIconProps> = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
    const { className, color = 'inherit', fontSize = 'default', viewBox, htmlColor, titleAccess, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        {
            [classes[`color${ capitalize(color) }`]]: color !== 'inherit',
            [classes[`fontSize${ capitalize(fontSize) }`]]: fontSize !== 'default'
        }
    );

    return (
        <svg
            className={ classNames }
            viewBox={ viewBox }
            color={ htmlColor }
            ref={ ref }
            { ...rest }>
            { children }
            { titleAccess ? <title>{ titleAccess }</title> : null }
        </svg>
    );
});

SvgIcon.displayName = name;

SvgIcon.defaultProps = {
    color: 'inherit',
    fontSize: 'default',
    htmlColor: undefined,
    titleAccess: '',
    viewBox: '0 0 1024 1024'
};

SvgIcon.propTypes = {
    color: PropTypes.oneOf<Color>(['inherit', 'primary', 'secondary', 'disabled']),
    fontSize: PropTypes.oneOf<FontSize>(['inherit', 'default', 'small', 'large']),
    htmlColor: PropTypes.string,
    titleAccess: PropTypes.string,
    viewBox: PropTypes.string
};

export default SvgIcon;