export function getContents (markdown: string) {
    return markdown.replace(/---[\r\n]([\s\S]*)[\r\n]---/, '') // Remove header information
        .split(/^{{("demo":[^}]*)}}$/gm) // Split markdown into an array, separating demos
        .filter(content => !/^\s*$/.test(content)); // Remove empty lines
}

export const demoRegexp = /^"demo": "(.*)"/;
