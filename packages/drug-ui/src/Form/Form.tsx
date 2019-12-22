import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './Form.style';
import { createUseStyles } from '../styles';
import { validate, Rule, Rules } from './validate';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit?: (e: React.FormEvent) => void;
    rules?: Rules;
    ref?: React.Ref<HTMLFormElement>
}

type FormClassProps = 'root';

const name = 'Form';

const useStyles = createUseStyles<FormClassProps>(styles, name);

export interface FormValue {
    [key: string]: any;
}

const Form: React.FC<FormProps> = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => {
    const { className, onSubmit, children, ...rest } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );

    const validator = (rule: Rule, value: any, callback: (str?: string) => void) => {
        if (value === '123') {
            callback('fk');
        } else {
            callback();
        }
    };
    const rules: Rules = {
        name: [
            {
                required: true, message: '请输入用户名！'
            },
            {
                validator: validator
            }
        ],
        password: [
            {
                required: true, message: '请输入密码！'
            },
            {
                min: 5, max: 10, message: '最小 5 个字符'
            }
        ],
        types: [
            {
                required: true, message: '请选择类型！'
            },
            {
                min: 3, max: 5, message: '长度在 3 到 5 个类型'
            }
        ]
    };
    const result = validate({ name: '123', password: '', types: ['sad', 'asd'] }, rules);
    console.log(result);

    Promise.all(Object.values(result).flat()).then(
        () => {
            console.log('okokok');
        },
        () => {
            console.log(false);
        }
    );

    return (
        <form
            className={ classNames }
            ref={ ref }
            onSubmit={ (e) => onSubmit && onSubmit(e) }
            { ...rest }>
            { children }
        </form>
    );
});

Form.displayName = name;

Form.defaultProps = {
    onSubmit: undefined,
    rules: undefined
};

Form.propTypes = {
    onSubmit: PropTypes.func
};

export default Form;
