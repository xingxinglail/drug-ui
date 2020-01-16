export interface FormContextType {
    values: {
        [key: string]: any;
    };
    setValue: (key: string, value: any) => void;
    count: number;
    setError: (key: string) => () => void;
}
export declare const FormContext: any;
