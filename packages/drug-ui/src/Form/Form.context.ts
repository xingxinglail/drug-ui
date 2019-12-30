import { createContext } from 'react';

export interface FormContextType {
    values: { [key: string]: any };
    setValue: (key: string, value: any) => void;
    count: number;
    setError: (key: string) => () => void;
}

// @ts-ignore
export const FormContext = createContext<FormContextType>(null);
