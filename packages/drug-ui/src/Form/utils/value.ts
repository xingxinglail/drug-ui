import { NamePath, InternalNamePath } from '../interface';
import { toArray } from '.';

export const getNamePath = (namePath: NamePath | null): InternalNamePath => {
    return toArray(namePath);
};
