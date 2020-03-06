import { ReducerAction } from './useForm';

export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;

export type StoreValue = any;
export interface Store {
    [name: string]: StoreValue;
}

export type EventArgs = any[];

export interface Meta {
    touched: boolean;
    validating: boolean;
    errors: string[];
    name: InternalNamePath;
}
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

export interface FieldData extends Partial<Omit<Meta, 'name'>> {
    name: NamePath;
    value?: StoreValue;
}

export interface FieldEntity {
    onStoreChange: (store: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo) => void;
    // isFieldTouched: () => boolean;
    // isFieldValidating: () => boolean;
    // getMeta: () => Meta;
    // getNamePath: () => InternalNamePath;
    // getErrors: () => string[];
    // props: {
    //     name?: NamePath;
    //     dependencies?: NamePath[];
    // };
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
    getFields?: (namePathList?: InternalNamePath[]) => FieldData[];
}

export interface FormInstance {
    getFieldValue: (name: NamePath) => StoreValue;
    getFieldsValue: (nameList?: NamePath[] | true) => Store;
    isFieldsTouched(nameList?: NamePath[], allFieldsTouched?: boolean): boolean;
    isFieldTouched: (name: NamePath) => boolean;
    resetFields: (fields?: NamePath[]) => void;
    setFields: (fields: FieldData[]) => void;
    setFieldsValue: (value: Store) => void;
    submit: () => void;
}

export type InternalFormInstance = Omit<FormInstance, 'validateFields'> &  {

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
