import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './Form.style';
import { createUseStyles } from '../styles';
import { Rule, Rules } from './validate';
import FormField from '../FormField';
import { FormContext } from './Form.context';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    initialState?: { [key: string]: any };
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
    const { className, initialState, onSubmit, children, ...rest } = props;
    const [state, setState] = React.useState(initialState);
    const [count, setCount] = React.useState(0);
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );
    // const rules: Rules = React.Children.toArray(children).reduce((prev: { [key: string]: Rule[] }, current: React.ReactNode) => {
    //     if (current && (current as { type: { displayName: string } }).type.displayName === FormField.displayName) {
    //         prev[(current as React.ReactElement).props.name] = (current as React.ReactElement).props.rules;
    //     }
    //     return prev;
    // }, {});

    const contextValue = {
        values: state,
        setValue (key: string, val: any) {
            setState({
                ...state,
                [key]: val
            });
        },
        count,
        setError (key: string) {
            console.log(key);
            return () => {
                console.log(`${key}done`);
            }
        }
    };
    const newChildren = React.Children.map(children, (child :React.ReactNode) => {
        if (typeof child === 'object' && typeof (child as React.ReactElement).type === 'object' && (child as any).type.displayName === FormField.displayName) {
            return React.cloneElement(child as React.ReactElement, { error: false });
        }
        return child;
    });

    // console.log(contextValue);
    // const validator = (rule: Rule, value: any, callback: (str?: string) => void) => {
    //     if (value === '123') {
    //         callback('fk');
    //     } else {
    //         callback();
    //     }
    // };
    //
    // const validator2 = (rule: Rule, value: any, callback: (str?: string) => void) => {
    //     if (value === 'dddddd') {
    //         setTimeout(() => {
    //             callback('密码错误');
    //         }, 500);
    //     } else {
    //         callback();
    //     }
    // };
    // const rules: Rules = {
    //     name: [
    //         {
    //             required: true, message: '请输入用户名！'
    //         },
    //         {
    //             validator: validator
    //         }
    //     ],
    //     password: [
    //         {
    //             required: true, message: '请输入密码！'
    //         },
    //         {
    //             min: 5, max: 10, message: '最小 5 个字符'
    //         },
    //         {
    //             validator: validator2
    //         }
    //     ],
    //     types: [
    //         {
    //             required: true, message: '请选择类型！'
    //         },
    //         {
    //             min: 3, max: 5, message: '长度在 3 到 5 个类型'
    //         }
    //     ]
    // };
    // validate({ name: '12s3', password: 'sdddd', types: ['asd', 'kjh', 'asd'] }, rules, (errors) => {
    //     console.log(isEmptyObject(errors));
    //     console.log(errors);
    // });

    const handleSubmit = (e: React.FormEvent) => {
        // todo 如何触FormField组件验证
        setCount(count + 1);
        onSubmit && onSubmit(e);
    };

    return (
        <form
            className={ classNames }
            ref={ ref }
            onSubmit={ handleSubmit }
            { ...rest }>
            <FormContext.Provider value={ contextValue }>
                { newChildren }
            </FormContext.Provider>
        </form>
    );
});

Form.displayName = name;

Form.defaultProps = {
    initialState: {},
    onSubmit: undefined,
    rules: undefined
};

Form.propTypes = {
    initialState: PropTypes.object,
    onSubmit: PropTypes.func
};

export default Form;
