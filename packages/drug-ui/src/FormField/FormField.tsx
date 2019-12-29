import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './FormField.style';
import { createUseStyles } from '../styles';
import { validate, Rule } from '../Form/validate';
import { isEmptyObject } from '../utils/index';
import { FormContext, FormContextType } from '../Form/Form.context';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    error?: boolean;
    rules?: Rule[];
    children: React.ReactElement;
    onSubmit?: (e: React.FormEvent) => void;
    ref?: React.Ref<HTMLDivElement>
}

type FormFieldClassProps = 'root';

const name = 'FormField';

const useStyles = createUseStyles<FormFieldClassProps>(styles, name);

const FormField: React.FC<FormFieldProps> = React.forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
    const { className, name = '', error: errorProp, rules, children, ...rest } = props;
    const formContext = React.useContext<FormContextType>(FormContext);
    const [error, setError] = React.useState(errorProp);
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );

    const handleChange = (e: React.ChangeEvent) => {
        if (name && rules) {
            const val = (e.target as HTMLInputElement).value;
            validate({ [name]: val }, { [name]: rules }, (errors) => {
                const hasError = !isEmptyObject(errors);
                setError(hasError);
                if (hasError) console.log(errors[name][0]);
            });
            formContext.setValue(name, val);
        }
    };

    return (
        !formContext ? null :
            <div
                className={ classNames }
                ref={ ref }
                { ...rest }>
                { React.cloneElement(children, { defaultValue: formContext.values[name], error, onChange: handleChange }) }
            </div>
    );
});

FormField.displayName = name;

FormField.defaultProps = {
    name: '',
    error: false,
    onSubmit: undefined
};

FormField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default FormField;
