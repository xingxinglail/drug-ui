import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './Input.style';
import { createUseStyles } from '../styles';
import { PropTypes as ComponentPropTypes, SimpleSpread } from '..';

interface PropsExtra {
    size?: ComponentPropTypes.Size;
}

export interface InputProps extends SimpleSpread<React.InputHTMLAttributes<HTMLInputElement>, PropsExtra> {
    defaultValue?: string;
    value?: string;
    label?: string;
    id?: string;
    placeholder?: string;
    error?: boolean;
    onChange?: (e: React.ChangeEvent) => void;
    ref?: React.Ref<HTMLInputElement>
}

type InputClassProps =
    'root'
    | 'label'
    | 'labelVisible'
    | 'labelError'
    | 'inputBase'
    | 'inputBaseVisible'
    | 'inputBaseError'
    | 'inputVisible'
    | 'input';

const name = 'Input';

const useStyles = createUseStyles<InputClassProps>(styles, name);

const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, defaultValue, value, size = 'medium', id, label = '', placeholder, error, onChange, children, ...rest } = props;
    const [visible, setVisible] = React.useState<boolean>(!!(defaultValue || value));
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );

    const handleMouseDown = (e: React.MouseEvent) => {
        setVisible(true);
        const input: HTMLInputElement | null = e.currentTarget.querySelector('input');
        input!.blur();
    };

    const handleBlur = (e: React.FocusEvent) => {
        const value: string = (e.currentTarget as HTMLInputElement).value;
        setVisible(!!value);
    };

    const handleChange = (e: React.ChangeEvent) => {
        onChange && onChange(e);
    };

    return (
        <div className={ classNames }>
            <label
                className={ classnames(classes.label, {
                    [classes.labelVisible]: visible,
                    [classes.labelError]: error
                }) }
                htmlFor={ id }>
                { label }
            </label>
            <div
                className={ classnames(classes.inputBase, {
                    [classes.inputBaseVisible]: visible,
                    [classes.inputBaseError]: error
                }) }
                onMouseDown={ handleMouseDown }>
                <input
                    ref={ ref }
                    className={ classnames(classes.input, { [classes.inputVisible]: visible }) }
                    id={ id }
                    type="text"
                    placeholder={ placeholder }
                    defaultValue={ defaultValue }
                    onChange={ handleChange }
                    onBlur={ handleBlur } />
            </div>
        </div>
    );
});

Input.displayName = name;

Input.defaultProps = {
    defaultValue: '',
    value: '',
    size: 'medium',
    id: undefined,
    label: '',
    placeholder: '',
    error: false
};

Input.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.oneOf<ComponentPropTypes.Size>(['small', 'medium', 'large']),
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
};

export default Input;
