import * as React from 'react';
import {
    FormInstance,
    NamePath,
    Store,
    StoreValue,
    InternalNamePath,
    InternalHooks,
    InternalFormInstance,
    FieldEntity,
    Callbacks,
    NotifyInfo,
    ValidateOptions,
    FieldError,
    FieldData
} from './interface';
import { getNamePath, getValue, setValue, setValues, containsNamePath } from './utils/value';
import NameMap from './utils/NameMap';

interface UpdateAction {
    type: 'updateValue';
    namePath: InternalNamePath;
    value: StoreValue;
}

interface ValidateAction {
    type: 'validateField';
    namePath: InternalNamePath;
    triggerName: string;
}

type InvalidateFieldEntity = { INVALIDATE_NAME_PATH: InternalNamePath };

export type ReducerAction = UpdateAction | ValidateAction;

class FormStore {

    private forceRootUpdate: () => void;

    private subscribable: boolean = true;

    private store: Store = {};

    private fieldEntities: FieldEntity[] = [];

    private initialValues: Store = {};

    private callbacks: Callbacks = {};

    constructor (forceRootUpdate: () => void) {
        this.forceRootUpdate = forceRootUpdate;
    }

    public getForm = (): InternalFormInstance => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,
        getFieldError: this.getFieldError,
        getFieldsError: this.getFieldsError,
        isFieldsTouched: this.isFieldsTouched,
        isFieldTouched: this.isFieldTouched,
        resetFields: this.resetFields,
        setFields: this.setFields,
        setFieldsValue: this.setFieldsValue,
        submit: this.submit,
        getInternalHooks: this.getInternalHooks
    });

    private getInternalHooks = (): InternalHooks => {

        return {
            dispatch: this.dispatch,
            registerField: this.registerField,
            useSubscribe: this.useSubscribe,
            setInitialValues: this.setInitialValues,
            setCallbacks: this.setCallbacks,
            getFields: this.getFields
        };
    };

    private getFieldValue = (name: NamePath): StoreValue => {
        const namePath: InternalNamePath = getNamePath(name);
        return getValue(this.store, namePath);
    };

    private getFieldError = (name: NamePath): string[] => {
        return this.getFieldsError([name])[0].errors;
    };

    private getFieldsError = (nameList?: NamePath[]): FieldError[] => {
        const fieldEntities = this.getFieldEntitiesForNamePathList(nameList);
        return fieldEntities.map((entity, index) => {
            if (entity && !('INVALIDATE_NAME_PATH' in entity)) {
                return {
                    name: entity.getNamePath(),
                    errors: entity.getErrors(),
                };
            }
            return {
                name: getNamePath(nameList![index]),
                errors: [],
            };
        });
    };

    private getFieldsValue = (nameList?: NamePath[] | true): Store => {
        return this.store;
    };

    private isFieldsTouched = (nameList?: NamePath[], allFieldsTouched?: boolean): boolean => {
        return true;
    };

    private isFieldTouched = (name: NamePath): boolean => {
        return true;
    };

    private resetFields = (nameList?: NamePath[]) => {
        const prevStore = this.store;
        if (!nameList) {
            this.store = setValues({}, this.initialValues);
            this.notifyObservers(prevStore, null, { type: 'reset' });
            return;
        }

        const namePathList: InternalNamePath[] = nameList.map(getNamePath);
        namePathList.forEach(namePath => {
            const initialValue = getValue(this.initialValues, namePath);
            this.store = setValue(this.store, namePath, initialValue);
        });
        this.notifyObservers(prevStore, namePathList, { type: 'reset' });
    };

    private getFields = (): FieldData[] => {
        return this.getFieldEntities(true).map(
            (field: FieldEntity): FieldData => {
                const namePath = field.getNamePath();
                const meta = field.getMeta();
                return {
                    ...meta,
                    name: namePath,
                    value: this.getFieldValue(namePath),
                };
            },
        );
    };


    private setFields = (fields: FieldData[]) => {
        const prevStore = this.store;

        fields.forEach((fieldData: FieldData) => {
            const { name, errors, ...data } = fieldData;
            const namePath = getNamePath(name);

            if ('value' in data) {
                this.store = setValue(this.store, namePath, data.value);
            }

            this.notifyObservers(prevStore, [namePath], {
                type: 'setField',
                data: fieldData,
            });
        });
    };

    private setFieldsValue = (store: Store) => {
        const prevStore = this.store;

        if (store) {
            this.store = setValues(this.store, store);
        }

        this.notifyObservers(prevStore, null, {
            type: 'valueUpdate',
            source: 'external',
        });
    };

    private submit = () => {
        this.validateFields();
    };

    private dispatch = (action: ReducerAction) => {
        switch (action.type) {
            case 'updateValue': {
                const { namePath, value } = action;
                this.updateValue(namePath, value);
                break;
            }
            case 'validateField': {
                const { namePath, triggerName } = action;
                this.validateFields([namePath], { triggerName });
                break;
            }
            default:
            // Currently we don't have other action. Do nothing.
        }
    };

    private updateValue = (name: NamePath, value: StoreValue) => {
        const namePath = getNamePath(name);
        const prevStore = this.store;
        this.store = setValue(this.store, namePath, value);
        this.notifyObservers(prevStore, [namePath], {
            type: 'valueUpdate',
            source: 'internal',
        });
    };

    private notifyObservers = (
        prevStore: Store,
        namePathList: InternalNamePath[] | null,
        info: NotifyInfo,
    ) => {
        if (this.subscribable) {
            // 触发所有 Field 组件内的 onStoreChange 方法
            this.getFieldEntities().forEach(({ onStoreChange }) => {
                onStoreChange(prevStore, namePathList, info);
            });
        } else {
            this.forceRootUpdate();
        }
    };

    private getFieldEntities = (pure: boolean = false) => {
        if (!pure) {
            return this.fieldEntities;
        }
        // 有 name 才验证或者其他操作
        return this.fieldEntities.filter(field => field.getNamePath().length);
    };

    private useSubscribe = (subscribable: boolean) => {
        this.subscribable = subscribable;
    };

    private setInitialValues = (initialValues: Store, init?: boolean) => {
        this.initialValues = initialValues || {};
        if (init) {
            this.store = setValues({}, initialValues, this.store);
        }
    };

    private registerField = (entity: FieldEntity) => {
        this.fieldEntities.push(entity);

        return () => {
            this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
        };
    };

    private setCallbacks = (callbacks: Callbacks) => {
        this.callbacks = callbacks;
    };

    private validateFields = (nameList?: NamePath[], options?: ValidateOptions) => {
        const namePathList: InternalNamePath[] | undefined = nameList
            ? nameList.map(getNamePath)
            : [];

        const promiseList: Promise<{
            name: InternalNamePath;
            errors: string[];
        }>[] = [];

        this.getFieldEntities(true).forEach((field: FieldEntity) => {

            if (!field.props.rules || !field.props.rules.length) {
                return;
            }

            if (!nameList) { // 验证所有子段
                namePathList.push(field.getNamePath());
            }

            const fieldNamePath = field.getNamePath();

            if (containsNamePath(namePathList, fieldNamePath)) {
                const promsie = field.validateRules();
                promiseList.push(
                    promsie.then(() => ({ name: fieldNamePath, errors: [] })).catch(errors => (
                        Promise.reject({ name: fieldNamePath, errors })
                    ))
                );
            }
            // Add field validate rule in to promise list
            // if (!provideNameList || containsNamePath(namePathList, fieldNamePath)) {
            //     const promise = field.validateRules({
            //         validateMessages: {
            //             ...defaultValidateMessages,
            //             ...this.validateMessages,
            //         },
            //         ...options,
            //     });
            //
            //     // Wrap promise with field
            //     promiseList.push(
            //         promise
            //         .then(() => ({ name: fieldNamePath, errors: [] }))
            //         .catch(errors =>
            //             Promise.reject({
            //                 name: fieldNamePath,
            //                 errors,
            //             }),
            //         ),
            //     );
            // }
        });
        Promise.allSettled(promiseList).then(res => {
            console.log('promiseList');
            console.log(res);
        });
    };

    private getFieldsMap = (pure: boolean = false) => {
        const cache: NameMap<FieldEntity> = new NameMap();
        this.getFieldEntities(pure).forEach(field => {
            const namePath = field.getNamePath();
            cache.set(namePath, field);
        });
        return cache;
    };

    private getFieldEntitiesForNamePathList = (
        nameList?: NamePath[],
    ): (FieldEntity | InvalidateFieldEntity)[] => {
        if (!nameList) {
            return this.getFieldEntities(true);
        }
        const cache = this.getFieldsMap(true);
        return nameList.map(name => {
            const namePath = getNamePath(name);
            return cache.get(namePath) || { INVALIDATE_NAME_PATH: getNamePath(name) };
        });
    };
}

const useForm = (form?: FormInstance): [FormInstance] => {
    const formRef = React.useRef<FormInstance>();
    const [, forceUpdate] = React.useState();
    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const forceReRender = () => {
                forceUpdate({});
            };
            formRef.current = new FormStore(forceReRender).getForm();
        }
    }
    return [formRef.current];
};

export default useForm;
