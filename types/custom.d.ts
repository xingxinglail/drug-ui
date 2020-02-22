declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.md' {
    const value: any;
    export default value;
}

interface Config {
    apiKey: string;
    indexName: string;
    inputSelector: string;
}

declare module 'docsearch.js' {
    export default function docsearch (config: Config): any;
}
