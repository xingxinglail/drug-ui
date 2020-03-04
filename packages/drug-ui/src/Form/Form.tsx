import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './Form.style';
import { createUseStyles } from '../styles';
import { Rule, Rules } from './validate';
import FormField from '../FormField';
import { FormFieldContext } from '../FormField/FormField.context';
import { FormContext } from './Form.context';
import { Store, FormInstance, InternalFormInstance } from './interface';
import useForm from './useForm';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    initialValues?: Store;
    form?: FormInstance;
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
    const { className, initialValues, form, onSubmit, children, ...rest } = props;
    const [formInstance] = useForm(form);
    const {
        useSubscribe,
        setInitialValues,
        setCallbacks
    } = (formInstance as InternalFormInstance).getInternalHooks();
    const classes = useStyles();

    const mountRef = React.useRef(false);
    setInitialValues(initialValues, !mountRef.current);
    if (!mountRef.current) mountRef.current = true;

    useSubscribe(true);

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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        onSubmit && onSubmit(e);
    };

    return (
        <form
            className={ classNames }
            ref={ ref }
            onSubmit={ handleSubmit }
            { ...rest }>
            <FormFieldContext.Provider value={ formInstance as InternalFormInstance }>
                { children }
            </FormFieldContext.Provider>
        </form>
    );
});

Form.displayName = name;

Form.defaultProps = {
    initialValues: undefined,
    onSubmit: undefined,
    rules: undefined
};

export default Form;
