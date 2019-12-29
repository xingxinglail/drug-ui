import { createContext } from 'react';

export interface FormContextType {
    values: { [key: string]: any };
    setValue: (key: string, value: any) => void;
}

// @ts-ignore
export const FormContext = createContext<FormContextType>(null);
