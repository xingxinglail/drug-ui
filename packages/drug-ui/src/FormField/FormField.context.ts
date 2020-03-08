import * as React from 'react';
import { InternalFormInstance } from '../Form/interface';

const fn: any = () => {};

export const FormFieldContext = React.createContext<InternalFormInstance>({
    getFieldValue: fn,
    getFieldsValue: fn,
    getFieldError: fn,
    getFieldsError: fn,
    isFieldsTouched: fn,
    isFieldTouched: fn,
    resetFields: fn,
    setFields: fn,
    setFieldsValue: fn,
    submit: fn,
    getInternalHooks: () => ({
        dispatch: fn,
        registerField: fn,
        useSubscribe: fn,
        setInitialValues: fn,
        setCallbacks: fn,
        getFields: fn,
        setValidateMessages: fn
    })
});
