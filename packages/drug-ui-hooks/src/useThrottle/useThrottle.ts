function useThrottle (fn: Function, wait: number = 0): (...args: any[]) => any {
    let startTime = 0;
    let result: any;
    return (...args: any[]) => {
        if (Date.now() - startTime >= wait) {
            result = fn(...args);
            startTime = Date.now();
        }
        return result;
    };
}

export default useThrottle;
