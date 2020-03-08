import { ReducerAction } from './useForm';
import { Rule } from './validate';

export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;

export type StoreValue = any;

export interface Store {
    [name: string]: StoreValue;
}

export type EventArgs = any[];

interface ValueUpdateInfo {
    type: 'valueUpdate';
    source: 'internal' | 'external';
}

export type NotifyInfo =
    | ValueUpdateInfo
    | {
    type: 'validateFinish' | 'reset';
}
    | {
    type: 'setField';
    data: FieldData;
}
    | {
    type: 'dependenciesUpdate';
    /**
     * Contains all the related `InternalNamePath[]`.
     * a <- b <- c : change `a`
     * relatedFields=[a, b, c]
     */
    relatedFields: InternalNamePath[];
};

export interface Meta {
    validating: boolean;
    errors: string[];
    name: InternalNamePath;
}

export interface FieldData extends Partial<Omit<Meta, 'name'>> {
    name: NamePath;
    value?: StoreValue;
}

export interface FieldError {
    name: InternalNamePath;
    errors: string[];
}

export interface FieldEntity {
    onStoreChange: (store: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo) => void;
    // isFieldTouched: () => boolean;
    isFieldValidating: () => boolean;
    getMeta: () => Meta;
    getNamePath: () => InternalNamePath;
    getErrors: () => string[];
    validateRules: () => Promise<string[]>;
    props: {
        name?: NamePath;
        rules?: Rule[];
        // dependencies?: NamePath[];
    };
}

export interface ValidateOptions {
    triggerName?: string;
}

export interface Callbacks {
    onValuesChange?: (changedValues: Store, values: Store) => void;
    onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
    onFinish?: (values: Store) => void;
    onFinishFailed?: () => void;
}

export interface InternalHooks {
    dispatch: (action: ReducerAction) => void;
    registerField: (entity: FieldEntity) => () => void;
    useSubscribe: (subscribable: boolean) => void;
    setInitialValues: (values: Store, init?: boolean) => void;
    setCallbacks: (callbacks: Callbacks) => void;
    getFields: () => FieldData[];
}

export interface FormInstance {
    getFieldValue: (name: NamePath) => StoreValue;
    getFieldsValue: (nameList?: NamePath[] | true) => Store;
    getFieldError: (name: NamePath) => string[];
    getFieldsError: (nameList?: NamePath[]) => FieldError[];

    isFieldsTouched (nameList?: NamePath[], allFieldsTouched?: boolean): boolean;

    isFieldTouched: (name: NamePath) => boolean;
    resetFields: (fields?: NamePath[]) => void;
    setFields: (fields: FieldData[]) => void;
    setFieldsValue: (value: Store) => void;
    submit: () => void;
}

export type InternalFormInstance = Omit<FormInstance, 'validateFields'> & {

    /**
     * Passed by field context props
     */
    prefixName?: InternalNamePath;

    /**
     * Form component should register some content into store.
     * We pass the `HOOK_MARK` as key to avoid user call the function.
     */
    getInternalHooks: () => InternalHooks;
};
