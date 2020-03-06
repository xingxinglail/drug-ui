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
    NotifyInfo
} from './interface';
import { getNamePath, getValue, setValue, setValues } from './utils/value';

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
            setCallbacks: this.setCallbacks
        };
    };

    private getFieldValue = () => {

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

    private setFields = () => {

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

    };

    private dispatch = (action: ReducerAction) => {
        switch (action.type) {
            case 'updateValue': {
                const { namePath, value } = action;
                this.updateValue(namePath, value);
                break;
            }
            // case 'validateField': {
            //     const { namePath, triggerName } = action;
            //     this.validateFields([namePath], { triggerName });
            //     break;
            // }
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
            this.getFieldEntities().forEach(({ onStoreChange }) => {
                onStoreChange(prevStore, namePathList, info);
            });
        } else {
            this.forceRootUpdate();
        }
    };

    private getFieldEntities = () => {
        return this.fieldEntities;
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

    private getFields = () => {

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
