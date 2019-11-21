import { readdir, readFile, writeFile } from 'fs';
import { basename, resolve } from 'path';
import { promisify } from 'util';
// @ts-ignore
import * as htm from 'htm';
// @ts-ignore
import * as prettier from 'prettier';

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

function toHump (name: string, capitalized: boolean = true): string {
    return capitalized
        ? name
            .replace(/-(\w)/g, (all, letter): string => letter.toUpperCase())
            .replace(/( |^)[a-z]/g, (all): string => all.toUpperCase())
        : name.replace(/-(\w)/g, (all, letter): string => letter.toUpperCase());
}

function h (type: string, props: any, ...children: any[]): any {
    const allPropKey = props ? Object.keys(props) : [];
    const match = allPropKey.find((prop): boolean => prop.includes('-'));
    if (match) {
        props[toHump(match, false)] = props[match];
        delete props[match];
    }
    return { type, props, children };
}

const html = htm.bind(h);

const getAllSvg = async () => {
    return await readdirAsync(resolve(__dirname, './remix'));
};

function toJson (data: object): string {
    return JSON.stringify(data, null, '\t');
}

function getComponentName (fileName: string, withSuffix: boolean): string {
    return withSuffix ? basename(fileName) : basename(fileName).split('.')[0];
}

const worker = async () => {
    try {
        const allSvg = await getAllSvg();
        const template = await readFileAsync(resolve(__dirname, './template'), { encoding: 'utf8' });
        for (const svg of allSvg) {
            let data = await readFileAsync(resolve(__dirname, './remix', svg), { encoding: 'utf8' });
            data = ' ' + data;
            data = data
                .replace(/ ([\s\S]*?).dtd">/gi, '')
                .replace(/<defs>([\s\S]*?)<\/defs>/gi, '')
                .replace(/t="([\s\S]*?)"/gi, '')
                .replace(/class="([\s\S]*?)"/gi, '')
                .replace(/p-id="([\s\S]*?)"/gi, '')
                .replace(/xmlns:xlink="([\s\S]*?)"/gi, '')
                .replace(/width="([\s\S]*?)"/gi, '')
                .replace('heigh', '')
                .replace(/height="([\s\S]*?)"/gi, '')
                .replace(/version="([\s\S]*?)"/gi, '')
                .trim();
            const jsx = html([data]);
            const componentName = toHump(getComponentName(svg, false));
            const jsxReplace = template
                .replace('{{jsx}}', toJson(jsx))
                .replace('{{componentName}}', componentName);
            await writeFileAsync(
                resolve(__dirname, `src/${ componentName }.ts`),
                prettier.format(jsxReplace, { singleQuote: true, tabWidth: 4, parser: 'typescript' }),
                { flag: 'w+' }
            );
        }

        const index = allSvg.reduce((acc, cur): string => {
            const componentName = toHump(getComponentName(cur, false));
            return acc + `export { default as ${ componentName } } from './${ componentName }'\n`;
        }, '');
        await writeFileAsync(resolve(__dirname, `src/index.ts`), index);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

worker();
