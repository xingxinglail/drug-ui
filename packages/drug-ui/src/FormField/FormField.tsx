import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './FormField.style';
import { createUseStyles } from '../styles';
import { validate, Rule } from '../Form/validate';
import {
    NamePath,
    InternalNamePath,
    InternalFormInstance,
    Store,
    FormInstance,
    EventArgs,
    FieldEntity,
    NotifyInfo
} from '../Form/interface';
import { isEmptyObject } from '../utils/index';
import { FormContext, FormContextType } from '../Form/Form.context';
import { FormFieldContext } from './FormField.context';
import { getNamePath, getValue, defaultGetValueFromEvent } from '../Form/utils/value';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement;
    name?: NamePath;
    trigger?: string;
    valuePropName?: string;
    error?: boolean;
    rules?: Rule[];
    ref?: React.Ref<HTMLDivElement>
}

type FormFieldClassProps = 'root';

const name = 'FormField';

const useStyles = createUseStyles<FormFieldClassProps>(styles, name);

const FormField: React.FC<FormFieldProps> = React.forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
    const { className, name, trigger, valuePropName, children } = props;
    const [, reRender] = React.useState();
    const context = React.useContext<InternalFormInstance>(FormFieldContext);
    // const [error, setError] = React.useState(errorProp);
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );

    const instance = React.useRef<FieldEntity>({
        onStoreChange (prevStore: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo) {
            const { getFieldsValue }: FormInstance = context;
            const values = getFieldsValue(true);
            const namePath = _getNamePath();
            const prevValue = _getValue(prevStore);
            const curValue = _getValue();
            if (prevValue !== curValue) reRender({});
        }
    });

    React.useEffect(() => {
        const { getInternalHooks }: InternalFormInstance = context;
        const { registerField } = getInternalHooks();
        registerField(instance.current);
    }, []);

    const _getNamePath = (): InternalNamePath => {
        const namePath = getNamePath(name!);
        return name ? [...namePath] : [];
    };

    const _getValue = (store?: Store) => {
        const { getFieldsValue }: FormInstance = context;
        const namePath = _getNamePath();
        return getValue(store || getFieldsValue(true), namePath);
    };

    const getControlled = (childProps: { [name: string]: any } = {}) => {
        const namePath = _getNamePath();
        const { getInternalHooks }: InternalFormInstance = context;
        const { dispatch } = getInternalHooks();
        const value = _getValue();

        const originTriggerFunc: any = childProps[trigger!];

        const control = {
            ...childProps,
            [valuePropName!]: value
        };

        // Add trigger
        control[trigger!] = (...args: EventArgs) => {

            let newValue = defaultGetValueFromEvent(valuePropName!, ...args);
            dispatch({
                type: 'updateValue',
                namePath,
                value: newValue,
            });

            if (originTriggerFunc) originTriggerFunc(...args);
        };
        console.log(control);
        return control;
    };

    const returnChildNode = React.cloneElement(children, getControlled(children.props));
    // const handleChange = (e: React.ChangeEvent) => {
    //     if (name && rules) {
    //         const val = (e.target as HTMLInputElement).value;
    //         validate({ [name]: val }, { [name]: rules }, (errors) => {
    //             const hasError = !isEmptyObject(errors);
    //             setError(hasError);
    //             if (hasError) console.log(errors[name][0]);
    //         });
    //         formContext.setValue(name, val);
    //     }
    // };

    return (
        <>{ returnChildNode }</>
    );
});

FormField.displayName = name;

FormField.defaultProps = {
    name: undefined,
    trigger: 'onChange',
    valuePropName: 'value',
    error: false,
    onSubmit: undefined
};

FormField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default React.memo(FormField);
