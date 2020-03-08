import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './FormField.style';
import { createUseStyles } from '../styles';
import { validate, Rule, RuleConfig } from '../Form/validate';
import {
    NamePath,
    InternalNamePath,
    InternalFormInstance,
    Store,
    FormInstance,
    EventArgs,
    FieldEntity,
    NotifyInfo,
    Meta
} from '../Form/interface';
import { isEmptyObject } from '../utils/index';
import { FormContext, FormContextType } from '../Form/Form.context';
import { FormFieldContext } from './FormField.context';
import { toArray } from '../Form/utils';
import { getNamePath, getValue, defaultGetValueFromEvent, containsNamePath } from '../Form/utils/value';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement;
    name?: NamePath;
    trigger?: string;
    validateTrigger?: string | string[] | false;
    valuePropName?: string;
    error?: boolean;
    rules?: Rule[];
    ref?: React.Ref<HTMLDivElement>
}

type FormFieldClassProps = 'root';

const name = 'FormField';

const useStyles = createUseStyles<FormFieldClassProps>(styles, name);

const FormField: React.FC<FormFieldProps> = React.forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
    const { className, name, trigger, validateTrigger, valuePropName, rules, children } = props;
    const [, reRender] = React.useState();
    const context = React.useContext<InternalFormInstance>(FormFieldContext);
    const [isValidating, setIsValidating] = React.useState(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const errorsRef = React.useRef<string[]>([]);
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );
    const validatePromise = React.useRef<Promise<string[]> | null>(null);

    const instance = React.useRef<FieldEntity>({
        props: {
            name,
            rules
        },
        isFieldValidating: () => !!validatePromise,
        onStoreChange (prevStore: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo) {
            const { getFieldsValue }: FormInstance = context;
            const values = getFieldsValue(true);
            const namePath = _getNamePath();
            const prevValue = _getValue(prevStore);
            const curValue = _getValue();
            const namePathMatch = namePathList && containsNamePath(namePathList, namePath);
            switch (info.type) {
                case 'reset':
                    if (!namePathList || namePathMatch) {
                        setIsValidating(false);
                        validatePromise.current = null;
                        setErrors([]);
                        errorsRef.current = [];
                        reRender({});
                        return;
                    }
                    break;
                case 'setField':
                    if (namePathMatch) {
                        const { data } = info;
                        if ('validating' in data) {
                            setIsValidating(true);
                            validatePromise.current = data.validating ? Promise.resolve([]) : null;
                        }
                        if ('errors' in data) {
                            const errors = data.errors || [];
                            setErrors(errors);
                            errorsRef.current = errors;
                        }
                        reRender({});
                        return;
                    }
                    break;
                default:
                    if (prevValue !== curValue) reRender({});
                    break;
            }
        },
        validateRules () {
            /*
            * promise 1 === validatePromise
            * promise pedding...
            * */
            /*
            * promise 2 === validatePromise
            * promise2 pedding...
            * promise 1.then  validatePromise.current !== promise
            * */
            // promise 2.then validatePromise.current === promise 多次调用只渲染最后一次
            const promise = validate(_getNamePath(), _getValue(), _getRules());
            validatePromise.current = promise;
            setIsValidating(true);
            setErrors([]);
            errorsRef.current = [];
            promise.catch(e => e).then(errors => {
                if (validatePromise.current === promise) {
                    ReactDOM.unstable_batchedUpdates(() => {
                        setIsValidating(false);
                        setErrors(errors);
                        errorsRef.current = errors;
                        validatePromise.current = null;
                    });
                }
            });
            return promise;
        },
        getNamePath (): InternalNamePath {
            const namePath = getNamePath(name!);
            return 'name' in props ? [...namePath] : [];
        },
        getErrors: () => errorsRef.current,
        getMeta () {
            return {
                validating: !!validatePromise.current,
                errors: errorsRef.current,
                name: [...getNamePath(name!)],
            };
        }
    });

    React.useEffect(() => {
        const { getInternalHooks }: InternalFormInstance = context;
        const { registerField } = getInternalHooks();
        registerField(instance.current);
    }, []);

    const _getNamePath = (): InternalNamePath => {
        const namePath = getNamePath(name!);
        return 'name' in props ? [...namePath] : [];
    };

    const _getValue = (store?: Store) => {
        const { getFieldsValue }: FormInstance = context;
        const namePath = _getNamePath();
        return getValue(store || getFieldsValue(true), namePath);
    };

    const _getRules = (): RuleConfig[] => {
        return (rules || []).map(
            (rule: Rule): RuleConfig => {
                if (typeof rule === 'function') {
                    return rule(context);
                }
                return rule;
            }
        );
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

        const validateTriggerList: string[] = toArray(validateTrigger || []);

        validateTriggerList.forEach((triggerName: string) => {
            // Wrap additional function of component, so that we can get latest value from store
            const originTrigger = control[triggerName];
            control[triggerName] = (...args: EventArgs) => {
                if (originTrigger) {
                    originTrigger(...args);
                }
                // Always use latest rules
                if (rules && rules.length) {
                    // We dispatch validate to root,
                    // since it will update related data with other field with same name
                    dispatch({
                        type: 'validateField',
                        namePath,
                        triggerName,
                    });
                }
            };
        });

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
        <>
            { returnChildNode }
            {
                errors.map((error, index) => (
                    <p key={ index }>{ error }</p>
                ))
            }
            { isValidating && '正在验证...' }
        </>
    );
});

FormField.displayName = name;

FormField.defaultProps = {
    name: undefined,
    trigger: 'onChange',
    validateTrigger: 'onChange',
    valuePropName: 'value',
    error: false,
    onSubmit: undefined
};

FormField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default FormField;
